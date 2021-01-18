class ExpressError extends Error {
  constructor(errorType, msg) {
    super();
    switch (errorType) {
      case "CastError":
        this.status = 404;
        this.message = "Could not find national park that you were inputting";
        break;

      case "SchemaError":
        console.log(`expressError msg: ${msg}`);
        this.status = 500;
        this.message = msg;
        break;

      case "NoPageFoundError":
        this.status = 404;
        this.message = "No such page exists homiee!!";
        break;

      case "ValidationError":
        this.status = 500;
        this.message = "Need to input proper data in the form";
        break;

      case "TypeError":
        this.status = 500;
        if (msg) {
          this.message = msg;
        } else {
          this.message = "Not correct form input type";
        }

        break;

      default:
        this.status = 404;
        this.message = "Beboop...beboop...Unknown error...";
        break;
    }
    this.name = errorType;
  }
}

module.exports = ExpressError;
