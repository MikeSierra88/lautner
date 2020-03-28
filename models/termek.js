var mongoose  = require("mongoose");

var termekSchema = new mongoose.Schema({
    nev: String,
    kiszereles: String,
    ar: Number,
});
module.exports = new mongoose.model("Termek", termekSchema);