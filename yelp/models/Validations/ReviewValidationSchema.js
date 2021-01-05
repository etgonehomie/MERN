const Joi = require("joi");

module.exports.reviewValidationSchema = Joi.object({
  review: Joi.object({
    title: Joi.string().max(40).required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    description: Joi.string().required(),
  }).required(),
});
