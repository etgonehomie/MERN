class ExpressError extends Error {
  constructor(errorType) {
    super();
    switch (errorType) {
      case "loginError":
        this.message = "You are not authorized to receive this page";
        this.status = 401;
        break;
      case "homepageNotFound":
        this.message = "Homepage has not been built yet";
        this.status = 404;
        console.log(`this is the stack trace: ${this.stack}`);
    }
  }
}

module.exports = ExpressError;
