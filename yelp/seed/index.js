const mongoose = require("mongoose");
const c = require("../constants");
const NationalPark = require("../models/nationalParkModel");

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

const seedNationalParks = [
  {
    title: "Park 1",
    location: "Sunny Cal i A",
    description: "Sandy Shores",
  },
  {
    title: "Park 2",
    location: "Sunny Cal i A",
    description: "Clear Camels",
  },
];

// Loop over n times to create a database full of parks
const numberOfParks = 100;
const seedDatabase = async () => {
  await NationalPark.deleteMany({});
  for (nationalPark of seedNationalParks) {
    const park = NationalPark(nationalPark);
    await park.save();
  }
};

// Seed the database then close the connection
seedDatabase().then(() => {
  console.log(`Seeded database successfully: ${numberOfParks} national parks`);
  mongoose.connection.close();
});
