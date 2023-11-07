const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// Get all products
router.get("/", async (req, res) => {
	// Finding all products
	try {
		const productData = await Product.findAll({
			// Including associated Category & Tag
			include: [
				{
					model: Category,
				},
				{
					model: Tag,
					through: ProductTag,
					as: "product_tag",
				},
			],
		});
		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get one product
router.get("/:id", async (req, res) => {
	try {
		const productData = await Product.findByPk(req.params.id, {
			// Including associated Category & Tag
			include: [
				{
					model: Category,
				},
				{
					model: Tag,
					through: ProductTag,
					as: "product_tag",
				},
			],
		});
		// Checking to see if there is corresponding product to the Id being fetched
		if (!productData) {
			res.status(404).json("No product found matching this Id!");
			return;
		}
		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create new product
router.post("/", async (req, res) => {
	await Product.create(req.body)
		.then((product) => {
			// If there's product tags, we need to create pairings to bulk create in the ProductTag model
			if (req.body.tagIds.length) {
				const productTagIdArr = req.body.tagIds.map((tag_id) => {
					return {
						product_id: product.id,
						tag_id,
					};
				});
				return ProductTag.bulkCreate(productTagIdArr);
			}
			// If no product tags, just respond
			res.status(200).json(product);
		})
		.then((productTagIds) => res.status(200).json(productTagIds))
		.catch((err) => {
			console.log(err);
			res.status(400).json(err);
		});
});

// Update product
router.put("/:id", async (req, res) => {
	// Updating product data
	await Product.update(req.body, {
		where: {
			id: req.params.id,
		},
	})
		.then((product) => {
			// Finding all associated tags from ProductTag
			return ProductTag.findAll({ where: { product_id: req.params.id } });
		})
		.then((productTags) => {
			// Getting list of current tag_ids
			const productTagIds = productTags.map(({ tag_id }) => tag_id);
			// Creating filtered list of new tag_ids
			const newProductTags = req.body.tagIds
				.filter((tag_id) => !productTagIds.includes(tag_id))
				.map((tag_id) => {
					return {
						product_id: req.params.id,
						tag_id,
					};
				});
			// Figuring out which ones to remove
			const productTagsToRemove = productTags
				.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
				.map(({ id }) => id);

			// Running both actions
			return Promise.all([
				ProductTag.destroy({ where: { id: productTagsToRemove } }),
				ProductTag.bulkCreate(newProductTags),
			]);
		})
		.then((updatedProductTags) => res.json(updatedProductTags))
		.catch((err) => {
			res.status(400).json(err);
		});
});

// Delete one product by its Id value
router.delete("/:id", async (req, res) => {
	try {
		const productData = await Product.destroy({
			where: {
				id: req.params.id,
			},
		});
		// Checking to see if there is corresponding product to the Id being deleted
		if (!productData) {
			res.status(404).json("No product found matching this Id!");
			return;
		}
		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
