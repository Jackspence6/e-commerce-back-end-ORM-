// Imports
const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Syncing sequelize models to the database, then turning on Server
sequelize
	.sync({ force: false })
	.then(() => {
		app.listen(PORT, () => {
			console.log(`App Now listening on port ${PORT}!🚀`);
		});
	})
	// Catching any errors when syncing sequelize models to the db & turning on Server
	.catch((err) => {
		console.error(err);
	});
