var express = require("express");
var Supplier = require("./models/supplierModel");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
app.use(
	cors({
		origin: "*",
	})
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database Set Up
const mongoDBURL = process.env.DATABASE_URL;

mongoose.Promise = global.Promise;
mongoose.connect(mongoDBURL);

const database = mongoose.connection;

database.on("error", (error) => {
	console.log(error);
});
database.once("connected", () => {
	console.log("Database Connected");
});

// Routes
app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Create Supplier
app.post("/supplier", async (req, res) => {
	console.log("POST");
	console.log(req.body);
	let supplier = new Supplier({
		name: req.body.name,
		logo: req.body.logo,
		address: req.body.address,
	});

	try {
		const dataToSave = await supplier.save();
		res.status(200).json(dataToSave);
		console.log("Success");
	} catch (error) {
		console.log("Error", error.message);
		res.status(400).json({ message: error.message });
	}
});

// Get All Suppliers
app.get("/suppliers", async (req, res) => {
	try {
		const result = await Supplier.find();
		res.status(200).json(result);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

app.listen(port, () => {
	return console.log(`Express is listening at port ${port}`);
});
