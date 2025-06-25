import mongoose from "mongoose";

export class MongooseMiddlewares {

  static validateObjectIdParam(req, res, next, value) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      const err = new Error(`ID inválido: ${value}`);
      err.statusCode = 400;
      err.esOperacional = true;
      return next(err);
    }
    next();
  }

}
