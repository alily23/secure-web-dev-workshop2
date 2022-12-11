require("dotenv").config()
const mongoose = require('mongoose');
//main().catch(err => console.log(err));

//Schema
const Schema = mongoose.Schema;
const LocationSchema = new Schema({
    filmType:  String, // String is shorthand for {type: String}
    filmProducerName: String,
    endDate:   Date,
    filmName: String,
    district: String,
    geolocation: {
        coordinates: {type: [Number]},
        type: {type: String}
    },
    sourceLocationId: String,
    filmDirectorName: String,
    address: String,
    startDate: Date,
    year: Number
});
const Location = mongoose.model('Location',LocationSchema)

//Connection
async function connection() {
    const mongoose = {connect: (param) => new Promise((resolve, reject) => setTimeout(() => resolve('Connected!' + param), 5000))}
    mongoose.connect(process.env.MONGO_URI).then((result) => {
        console.log(result)
        console.log("Question 7");
        Question7();
        console.log("question 7 fini");

    }).catch(e => console.error(e))
}
connection();
//mongoose.connection.close();

console.log("Je suis après la connexion");

async function Question7() {
    console.log("Je suis dans question7()");
    const data = require ('C:\\Users\\aliso\\secure-web-dev-workshop1\\lieux-de-tournage-a-paris.json');
    console.log(data.length-1);
    for(let i = 0; i < data.length; i++) {
        const loc = new Location({filmType: data[i]["fields"]["type_tournage"],
            filmProducerName: data[i]["fields"]["nom_producteur"],
            endDate: data[i]["fields"]["date_fin"],
            filmName: data[i]["fields"]["nom_tournage"],
            district: data[i]["fields"]["ardt_lieu"],
            geolocation: { coordinates: data[i]["fields"]["geo_shape"]["coordinates"], type: data[i]["fields"]["geo_shape"]["type"]},
            sourceLocationId: data[i]["fields"]["id_lieu"],
            filmDirectorName: data[i]["fields"]["nom_realisateur"],
            address: data[i]["fields"]["adresse_lieu"],
            startDate: data[i]["fields"]["date_debut"],
            year: data[i]["fields"]["annee_tournage"]
        });
        if(i==5) {
            console.log(loc);
        }

        await loc.save();
        //console.log(i);
    }
    const locs = Location.find();
    console.log(locs);
}

