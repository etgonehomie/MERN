const databaseName = "yelp-parks";
const databasePort = "27017";
const serverPort = "3000";
function displayDatabaseHeader() {
  return `Database named "${databaseName}" started on Port#${databasePort}`;
}

const flashType = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

function daysToMilliseconds(days) {
  const hoursInDay = 24;
  const minutesInHour = 60;
  const secondsInMinute = 60;
  const millisecondsInSecond = 1000;
  return (
    days * hoursInDay * minutesInHour * secondsInMinute * millisecondsInSecond
  );
}

function weeksToMilliseconds(weeks) {
  return daysToMilliseconds(weeks * 7);
}

function monthsToMilliseconds(months) {
  const averageDaysInMonth = 30;
  return daysToMilliseconds(averageDaysInMonth * months);
}

function yearsToMilliseconds(years) {
  return daysToMilliseconds(years * 365);
}

module.exports = {
  databaseName,
  databasePort,
  serverPort,
  flashType,
  daysToMilliseconds,
  weeksToMilliseconds,
  monthsToMilliseconds,
  yearsToMilliseconds,
  displayDatabaseHeader,
};
