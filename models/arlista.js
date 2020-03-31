var mongoose  = require("mongoose");
    // Kategoria = require("./kategoria");

var arlistaSchema = new mongoose.Schema({
    url: { type: String, unique: true, required: true, dropDups: true},
    title: { type: String, required: true }
});

module.exports = mongoose.model("Arlista", arlistaSchema);