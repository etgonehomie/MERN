const Joi = require("joi");

module.exports.parkValidationSchema = Joi.object({
  park: Joi.object({
    title: Joi.string().max(60).required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    imageURL: Joi.string().required(),
    price: Joi.number().precision(2).min(0).required(),
  }).required(),
});
