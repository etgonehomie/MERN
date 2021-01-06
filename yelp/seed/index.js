const mongoose = require("mongoose");
const c = require("../constants");
const NationalPark = require("../models/nationalParkModel");
const Review = require("../models/ReviewModel");
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
const numberOfParks = 10;

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDatabase = async () => {
  await NationalPark.deleteMany({});
  await Review.deleteMany({});
  await console.log("⛔ Deleted all previous database entries.");
  for (let i = 0; i < numberOfParks; i++) {
    const sampleCity = sample(cities);

    const park = NationalPark({
      title: `${sample(descriptors)} ${sample(places)}`,
      location: `${sampleCity.city}, ${sampleCity.state}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et fugiat reprehenderit, distinctio laboriosam officia ut perspiciatis excepturi soluta suscipit tenetur, nam voluptas quidem quibusdam. Rem, nisi unde? Veritatis, architecto hic? Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      imageURL: "https://source.unsplash.com/collection/8187675",
      price: 10,
    });
    await park.save();
  }
};

// Seed the database then close the connection
seedDatabase().then(() => {
  console.log(
    `✅ Seeded new database entries successfully: ${numberOfParks} national parks`
  );
  mongoose.connection.close();
});
