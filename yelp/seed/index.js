const mongoose = require("mongoose");
const c = require("../constants");
const NationalPark = require("../models/nationalParkModel");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose.connect(`mongodb://localhost:${c.databasePort}/${c.databaseName}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`Connection Success: ${c.displayDatabaseHeader()} open`);
});

// Loop over n times to create a database full of parks
const numberOfParks = 50;

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDatabase = async () => {
  await NationalPark.deleteMany({});
  for (let i = 0; i < numberOfParks; i++) {
    const sampleCity = sample(cities);

    const park = NationalPark({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${sampleCity.city}, ${sampleCity.state}`,
    });
    await park.save();
  }
};

// Seed the database then close the connection
seedDatabase().then(() => {
  console.log(`Seeded database successfully: ${numberOfParks} national parks`);
  mongoose.connection.close();
});
