const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const AsyncError = require("./AsyncError");

const Product = require("./models/product");

// Mongoose Boilerplate
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

// Express Boilerplate
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/**
 * 1. ASYNC ERROR - TRY CATCH
 *      You can use the try/catch method to try any async function and let a
 *      default error be thrown, or throw your own custom error when certain
 *      inputs are not met.
 *
 *      In this case, we will throw an error if the category query is used
 *      but the cateogry is not found
 */
const categories = ["fruit", "vegetable", "dairy"];

app.get("/products", async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category) {
      if (categories.includes(category)) {
        const products = await Product.find({ category });
        res.render("products/index", { products, category });
      }
      console.log("came here");
      throw new AsyncError("categoryNotFound");
    }
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  } catch (e) {
    next(e);
  }
});

app.get("/products/new", (req, res) => {
  res.render("products/new", { categories });
});

/**
 * 2. WRAPPER FUNCTION FOR ASYNC ERRORS:
 *      Instead of using try/catch all the time, can define a wrapper function.
 *      This takes the (req,res,next) function as an input, and appends a
 *      catch block onto it (aka wraps or decorates the function)
 */

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

app.post(
  "/products",
  wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
  })
);

/**
 * 2a. PASS ERROR TO DEFAULT ERROR HANDLER USING NEXT
 *      You can pass an error into the `next()` function so that whatever
 *      default error handler defined will be used.
 *      NOTE: You must use return as next() doesn't end execution of a function.
 */
app.get(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return next(new AsyncError("productNotFound"));
    }
    res.render("products/show", { product });
  })
);

/**
 * 2b. THROW AN ERROR:
 *      This automatically stops the function so do not need to include
 *      the `return` statement.
 *
 *      Since this is in a wrapper function, the catch block in the wrapper
 *      function will handle the error, which is to call the next(err), which
 *      calls the default error handler
 */
app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      throw new AsyncError("productNotFound");
    }
    res.render("products/edit", { product, categories });
  })
);

app.put(
  "/products/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/products/${product._id}`);
  })
);

app.delete(
  "/products/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect("/products");
  })
);

/**
 * 3. HANDLING SPECIFIC ERRORS.
 *      You can use the `err.name` to handle specific errors as needed.
 *      This is the Validation error handler for if the err.name = ValidationError
 *      Can make a similar one for CastError if desired
 */
const handleValidationErr = (err) => {
  console.dir(err);
  //In a real app, we would do a lot more here...
  return new Error(
    `You have entered the twlight zone where you can handle specific 'err.name'. This one is a Mongoose Validation Error with message...${err.message}`
  );
};

/**
 * 4. ERROR CHAINING/SPECIFIC CALLOUT -
 *      Used to show chaining of error handling and
 *      defining certain handlers when a specific error is found
 */
app.use((err, req, res, next) => {
  console.log(err.name);
  //We can single out particular types of Mongoose Errors:
  if (err.name === "ValidationError") err = handleValidationErr(err);
  next(err);
});

// Default error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("APP IS LISTENING ON PORT 3000!");
});
