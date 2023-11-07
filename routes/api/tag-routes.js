const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// Find all Tags
router.get("/", async (req, res) => {
	try {
		const tagData = await Tag.findAll({
			// Including associated Product
			include: [
				{
					model: Product,
					through: ProductTag,
					as: "associated_Product",
				},
			],
		});
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

//Find a single tag by its `id`
router.get("/:id", async (req, res) => {
	try {
		const tagData = await Tag.findByPk(req.params.id, {
			// Including associated Product
			include: [
				{
					model: Product,
					through: ProductTag,
					as: "associated_Product",
				},
			],
		});
		// Check to see if there is corresponding Tag to the Id being fetched
		if (!tagData) {
			res.status(404).json("No Tag found matching this Id!");
			return;
		}
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create a new tag
router.post("/", async (req, res) => {
	try {
		const tagData = await Tag.create(req.body);
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.put("/:id", (req, res) => {
	// update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
	// delete on tag by its `id` value
});

module.exports = router;
