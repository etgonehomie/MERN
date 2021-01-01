const mongoose = require("mongoose");
const { FarmStand, Produce, produceCategories } = require("./schemas");

mongoose
  .connect("mongodb://localhost:27017/farmStand2", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "Vegetable",
  },
  {
    name: "Organic Goddess Melon",
    price: 4.99,
    category: "Fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "Fruit",
  },
  {
    name: "Organic Celery",
    price: 1.5,
    category: "Vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "Dairy",
  },
];

Produce.insertMany(seedProducts)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });

// const p = new Produce({
//   name: "Ruby Grapefruit",
//   price: 1.99,
//   category: "Fruit",
// });
// p.save()
//   .then((p) => {
//     console.log(p);
//   })
//   .catch((e) => {
//     console.log(e);
//   });
mongoose.connection.close();
