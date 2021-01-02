/**
 * 3 MAIN WAYS TO RELATE DATA FOR MONGO
 *      1. FEW-to-1 ( <100 )
 *          - embed data within an array in the document itself
 *          - EX: addresses for user
 *      2. MANY-to-1 ( <1000 )
 *          - create a child doc and embed the CHILD doc ID onto a parent doc array
 *          - EX: contacts on your phone
 *      3. MILLIONS-to-1 ( >1000 )
 *          - create a child doc and store the PARENT doc id onto each child doc
 *          - EX: comments or tweets
 */

/**
 * Can also denormalize data if it makes sense (aka duplicate data on multiple docs)
 * This is useful when you are accessing many children docs
 * just to get a few pieces of information. This causes huge joins and query times,
 * when instead you can just duplicate the data pieces on updating/creation
 * of the data.
 */

/*******************************************************************************
 * *****************************************************************************
 * *****************************************************************************
 */
/**
 * Create an example of data modeling with a farm stand with many products.
 */
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Boiler plate for Mongoose
mongoose
  .connect(`mongodb://localhost:27017/farmStandDemo`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connection Success: Port# 27017 for farmStandDemo db open`);
  })
  .catch((e) => {
    console.log(`Connection Failure: for farmStandDemo`);
    console.log(
      `Ensure the mongo db is started using terminal alias cmd 'dbstart'`
    );
    console.log(`Error: ${e}`);
  });
const produceCategories = ["Fruit", "Vegetable", "Dairy", "Nuts"];
const produceSchema = new Schema({
  name: String,
  price: String,
  category: {
    type: String,
    enum: produceCategories,
  },
  farmStand: {
    type: Schema.Types.ObjectId,
    ref: "FarmStand",
  },
});

const farmStandSchema = new Schema({
  name: String,
  city: String,
  email: String,
  produce: [
    {
      type: Schema.Types.ObjectId,
      ref: "Produce",
    },
  ],
});

const Produce = mongoose.model("Produce", produceSchema);
const FarmStand = mongoose.model("FarmStand", farmStandSchema);
module.exports = { produceCategories, Produce, FarmStand };
