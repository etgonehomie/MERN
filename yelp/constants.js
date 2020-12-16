const databaseName = "yelp-parks";
const databasePort = "27017";
const serverPort = "3000";
function displayDatabaseHeader() {
  return `Database named "${databaseName}" started on Port#${databasePort}`;
}

module.exports = {
  databaseName,
  databasePort,
  serverPort,
  displayDatabaseHeader,
};
