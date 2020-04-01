var mongoose  = require('mongoose'),
    Arlista   = require('./arlista'),
    Kategoria = require('./kategoria'),
    Termek    = require('./termek');

// Seed database

async function seed() {
  var testKategoriak = [ "Sütemények", "Fagylalt" ];
  var testTermekek = [
    {
      nev: "Minyon",
      kategoria: "Sütemények",
      kiszereles: "darab",
      ar: 250
    },
    {
      nev: "Malomkerék",
      kategoria: "Sütemények",
      kiszereles: "darab",
      ar: 400
    },
    {
      nev: "Teasütemény",
      kategoria: "Sütemények",
      kiszereles: "lédig",
      ar: 3000
    },
    {
      nev: "Gesztenyepüré",
      kategoria: "Sütemények",
      kiszereles: "15 dkg/doboz",
      ar: 600
    },
    {
      nev: "Vanília",
      kategoria: "Fagylalt",
      kiszereles: "doboz",
      ar: 1500
    },
    {
      nev: "Eper",
      kategoria: "Fagylalt",
      kiszereles: "doboz",
      ar: 1500
    }
  ];
  
  var arlista = new Arlista({
  url: "hazhoz",
  title: "Házhoz szállítási árlista"
  });
  
  try {
    await arlista.save();
    console.log("arlista saved");
    var foundArlista = await Arlista.findOne({ url: "hazhoz" });
    for (var i = 0; i < testKategoriak.length; i++) 
    {
      var newKat = new Kategoria({
          kat: testKategoriak[i],
          arlista: foundArlista._id,
          termekek: []
        });
      await newKat.save(); 
      console.log("Kategoria Saved");
    }
    for (var i = 0; i < testTermekek.length; i++) {
      var foundKategoria = await Kategoria.
              findOne({kat: testTermekek[i].kategoria, arlista: foundArlista._id});
      var newTermek = new Termek({
            nev: testTermekek[i].nev,
            kiszereles: testTermekek[i].kiszereles,
            ar: testTermekek[i].ar
          });
      foundKategoria.termekek.push(newTermek);
      await foundKategoria.save();
      console.log("Saved");
    }
  }
  catch (err) {
    console.log(err);
  }
}

seed();