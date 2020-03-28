var mongoose  = require("mongoose");
    // Kategoria = require("./kategoria");

var arlistaSchema = new mongoose.Schema({
    url: String,
    title: String,
});

module.exports = mongoose.model("Arlista", arlistaSchema);