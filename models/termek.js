var mongoose  = require("mongoose"),
    Kategoria = require("./kategoria");


var termekSchema = new mongoose.Schema({
    nev: String,
    kiszereles: String,
    ar: Number,
    kategoria: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Kategoria"
    }
});
module.exports = new mongoose.model("Termek", termekSchema);