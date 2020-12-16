module.exports.databaseName = "yelp-parks";
module.exports.databasePort = "27017";
module.exports.serverPort = "3000";
module.exports.displayDatabaseHeader = () =>
  `Database named "${databaseName}" started on Port#${databasePort}`;
