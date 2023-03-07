var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SupplierSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	logo: {
		type: String,
	},
	address: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Supplier", SupplierSchema);
