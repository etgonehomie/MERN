const serverPort = "3000";
const databaseName = "shop";
const databasePort = "27017";
function displayDatabaseHeader() {
  return `Database named "${databaseName}" started on Port#${databasePort}`;
}

module.exports = { displayDatabaseHeader };
