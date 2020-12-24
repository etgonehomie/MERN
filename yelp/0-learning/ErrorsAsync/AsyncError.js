class AsyncError extends Error {
  constructor(errorType) {
    super();
    switch (errorType) {
      case "productNotFound":
        this.status = 404;
        this.message = "Product Not Found";
        break;
      case "categoryNotFound":
        this.status = 404;
        this.message = "Category Not Available. Choose from existing list.";
        break;
    }
  }
}

module.exports = AsyncError;
