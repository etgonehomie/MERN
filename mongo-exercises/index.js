// #1 Boilerplate for MongoDB with Mongoose package to help with interacting with data
const mongoose = require("mongoose");
const databaseName = "inventory";
const databasePort = "27017";
mongoose
  .connect(`mongodb://localhost:${databasePort}/${databaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection open");
  })
  .catch((e) => {
    console.log(`Connection failed with error: ${e}`);
  });

/**
 * This defines the aggregate order that was made by the seller or the consumer. An order consists of one or many purchases
 * @param shopID: Defines what shop customer purchased from
 * @param date: date and time of the order
 * @param totalPrice: total cost of order
 * @param orderType: an enum that defines if it was a customer or seller purchase
 * @param customerPurchaseIds: the purchase ids that define what item was purchased.
 * @param customerPurchaseIds: the purchase ids that define what item was purchased.
 * @param sourcingInformation: if it was a seller purchase, details about the sourcing company
 * @param customerInformation: if it was a customer purchase, details about the customer
 */
const orderSchema = new mongoose.Schema({
    shopID: String,
    date: Date,
    totalPrice: Number,
    type: String,
    customerPurchaseIds: [String],
    sourcingPurchaseIds: [String],
    sourcingInformation: sourcingCompanySchema,
    customerInformation: customerSchema,
    comments: String,
});

/**
 * This defines an individual purchase. A purchase can only be one item and is always aggregated into an order.
 * @param itemID: Defines the item that was purchased
 * @param date: Date and time that the item was purchased
 * @param quantity:
 * @param unitPrice:
 * @param totalPrice:
 */
const basePurchaseSchema = new mongoose.Schema({
    itemID: String,
    date: Date,
    quantity: Number,
    unitPrice: Number,
    totalPrice: Number,
})

/**
 * Defines the customer purchases that deplete the business inventory
 * @param netRevenue: Defines the income made (revenue - expenses)
 * @param purchasePlatform: Enum that defines whether purchased on phone, tablet, or desktop based on screen size.
 * @param shopID: Defines what shop customer purchased from (Etsy, Ebay, etc.)
 * @param customerID: Defines the unique customer ID
 */
const customerPurchaseSchema = new mongoose.Schema({
    purchaseInformation: basePurchaseSchema
    netRevenue: Number,
    purchasePlatform: String,
    shopID: String,
    customerID: String,
});

/**
 * Defines the sourcing purchase details used to stock up on business inventory
 * @param remainingQuantity: quantity of the item remaining after customers purchased. Used for FIFO calculation
 * @param isAnyQuantityRemaining: to easily filter whether used in net revenue calulation or not
 * @param sourcingID: ID of the company you purchased this item from
 */
const sourcingPurchaseSchema = new mongoose.Schema({
    purchaseInformation: basePurchaseSchema,
    remainingQuantity: Number,
    isAnyQuantityRemaining: Boolean,
    sourcingID: String,
})

const customerInformation = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String,
    ethnicity: String,
    nationality: String,
    country: String,
    state: String,
    city: String,
    neighborhood: String,
});

const sourcingCompanySchema = new mongoose.Schema({
    company: String,
    contactName: String,
    email: String,
    phoneNumber: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    country: String,
    zip: String,
    website: String,
    comments: String,
});

/**
 * Shop names are: FB Marketplace, Offerup, Craigslist, Etsy, Ebay, Amazon
 */
/**
 * @param name: Enum of shops that the application supports
 * @param url: URL to the page where you can add new items to your store
 * @param itemIds: list of item Ids that you are selling at the given shop
 */
const shopSchema = new mongoose.Schema({
  name: String,
  url: String,
  itemIds: [String],
});

/**
 * Defines the item details at a particular shop
 * @param url: URL to direct user to the place where he can modify inventory for that specific shop
 * @param unitSellPrice: Price per item, without the discount applied.
 * @param discountPercent: Stored in decimal
 * @param isAlwaysFreeShipping: Defines whether the item always has free shipping or not
 * @param freeShippingSpendThreshold: Defines how much customer has to purchase before free shipping
 * @param shippingCost: The cost of shipping if `freeShippingSpendThreshold` is not met
 */
const itemsInShopSchema = new mongoose.Schema({
    itemID: String,
    shopID: String,
    url: String,
    unitSellPrice: Number,
    discountPercent: Number,
    isAlwaysFreeShipping: Boolean,
    freeShippingSpendThreshold: Number,
    shippingCost: Number
});

const itemSchema = new mongoose.Schema({
  name: String,
  tagline: String,
  description: String,
  shopIDs: [String],
  averageUnitCost: Number,
  totalQuantityInStock: Number,
  totalQuantitySold: Number,
  hasAutoRebuy: Boolean,
  autoRebuyThreshold: Number,
  pictures: [pictureSchema],
});

/**
 * Defines the different picture sizes
 * @param isLandingPicture: Defines what picture is the first picture the user sees for a given item
 */
const pictureSchema = new mongoose.Schema({
    isLandingPicture: Boolean,
    name: String,
    thumbnail: String,
    small: String,
    medium: String,
    large: String,
    xlarge: String,
});
