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
 * @param shopId: Defines what shop customer purchased from
 * @param date: date and time of the order
 * @param totalPrice: total cost of order
 * @param orderType: an enum that defines if it was a customer or seller purchase
 * @param customerPurchaseIds: the purchase ids that define what item was purchased.
 * @param customerPurchaseIds: the purchase ids that define what item was purchased.
 *  * TODO: May not need the sourcing/customerInfo params. Might be redundant
 * @param sourcingInformation: if it was a seller purchase, details about the sourcing company
 * @param customerInformation: if it was a customer purchase, details about the customer
 */
const orderSchema = new mongoose.Schema({
  shopId: ObjectID,
  date: Date,
  totalPrice: Number,
  type: String,
  customerPurchaseIds: [ObjectID],
  sourcingPurchaseIds: [ObjectID],
  sourcingInformation: sourcingCompanySchema,
  customerInformation: customerSchema,
  comments: String,
});

/**
 * This defines an individual purchase. A purchase can only be one item and is always aggregated into an order.
 * @param itemId: Defines the item that was purchased
 * @param date: Date and time that the item was purchased
 * @param quantity:
 * @param unitPrice:
 * @param totalPrice:
 */
const basePurchaseSchema = new mongoose.Schema({
  itemId: ObjectID,
  date: Date,
  quantity: Number,
  unitPrice: Number,
  totalPrice: Number,
});

/**
 * Defines the customer purchases that deplete the business inventory
 * @param netRevenue: Defines the income made (revenue - expenses)
 * @param purchasePlatform: Enum that defines whether purchased on phone, tablet, or desktop based on screen size.
 * @param shopId: Defines what shop customer purchased from (Etsy, Ebay, etc.)
 * @param customerId: Defines the unique customer Id
 */
const customerPurchaseSchema = new mongoose.Schema({
  purchaseInformation: basePurchaseSchema,
  netRevenue: Number,
  purchasePlatform: String,
  shopId: ObjectID,
  customerId: ObjectID,
});

/**
 * Defines the sourcing purchase details used to stock up on business inventory
 * @param remainingQuantity: quantity of the item remaining after customers purchased. Used for FIFO calculation
 * @param isAnyQuantityRemaining: to easily filter whether used in net revenue calulation or not
 * @param sourcingId: Id of the company you purchased this item from
 */
const sourcingPurchaseSchema = new mongoose.Schema({
  purchaseInformation: basePurchaseSchema,
  remainingQuantity: Number,
  isAnyQuantityRemaining: Boolean,
  sourcingId: ObjectID,
});

/**
 * Defines information regarding the customer who purchased the item. Used to slice and dice data
 */
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

/**
 * Defines information for the company the business bought their invenotry from. Used to slice and dice data.
 * Also used for streamlining re-ordering if needed.
 */
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
 * Defines the shops where the business items are sold at
 * @param name: Enum of shops that the application supports
 *  - ENUM: FB Marketplace, Offerup, Craigslist, Etsy, Ebay, Amazon
 * @param url: URL to the page where you can add new items to your store
 * @param itemIds: list of item Ids that you are selling at the given shop
 */
const shopSchema = new mongoose.Schema({
  name: String,
  url: String,
  itemIds: [ObjectID],
});

/**
 * Defines the item details at a particular shop
 * @param itemId:
 * @param shopId:
 * @param title: Defaults to the name of the item, but can be overwritten for each shop the item is sold at
 * @param url: URL to direct user to the place where he can modify inventory for that specific shop
 * @param unitSellPrice: Price per item, without the discount applied.
 * @param discountPercent: Stored in decimal
 * @param isAlwaysFreeShipping: Defines whether the item always has free shipping or not
 * @param freeShippingSpendThreshold: Defines how much customer has to purchase before free shipping
 * @param shippingCost: The cost of shipping if `freeShippingSpendThreshold` is not met
 * @param restockQuantity: Defines what total quantity to restock the item to.
 * @param restockQuantityThreshold: Defines when the program will automatically increase the item stock at this store, if there is enough totalQuantity to do so.
 */
const itemsInShopSchema = new mongoose.Schema({
  itemId: ObjectID,
  shopId: ObjectID,
  title: String,
  url: String,
  unitSellPrice: Number,
  discountPercent: Number,
  isAlwaysFreeShipping: Boolean,
  freeShippingSpendThreshold: Number,
  shippingCost: Number,
  restockQuantity: Number,
  restockQuantityThreshold: Number,
});

/**
 * Defines the inventory for a given item
 * @param name: Item title to be displayed on the header
 * @param tagline: Secondary title
 * @param description:
 * @param tags: A way to tag the items to use for filtering and sorting
 * @param shopIds: Defines what shops this item is being sold at for the business
 * @param averageUnitCost:
 * @param totalQuantityInStock:
 * @param restockBufferQuantity: Defines what minimum quantity before not allowing auto restocking at shops.
 * @param totalQuantitySold:
 * @param hasAutoRebuy:
 * @param autoRebuyThreshold:
 * @param pictures:
 */
const itemSchema = new mongoose.Schema({
  name: String,
  tagline: String,
  description: String,
  tags: [String],
  shopIds: [ObjectID],
  averageUnitCost: Number,
  totalQuantityInStock: Number,
  restockBufferQuantity: Number,
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

/**
 * @param paidTier: defines what tier the user is subscribed to. 0 = Free tier, 1 = base, 2 = premium
 * @param tagLimit: Limit of different tags that user can have
 */
// TODO: Define the limits for each tier (Free, base, premium)
const userDataSchema = new mongoose.Schema({
  paidTier: Number,
  tagLimit: Number,
  numberOfPicturesPerItem: Number,
  numberOfShops: Number,
  numberOfItems: Number,
  isAutoRestock: Boolean,
  canViewCustomerData: Boolean,
  canViewSourcingData: Boolean,
  hasAdvanceFiltering: Boolean,
  hasBasicFiltering: Boolean,
});
