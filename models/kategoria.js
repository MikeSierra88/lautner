var mongoose = require("mongoose"),
    Arlista   = require("./arlista");

var termekSchema = new mongoose.Schema({
    nev: String,
    kiszereles: String,
    ar: Number,
});

var kategoriaSchema = new mongoose.Schema({
    kat: String,
    arlista: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Arlista"
    },
    termekek: [termekSchema]
});
module.exports = new mongoose.model("Kategoria", kategoriaSchema);