const Joi = require('joi');
const mongoose = require('mongoose');
const lookupSchema = new mongoose.Schema({
 description: {
    type: String,
    required: true
  },
  type:{
    type: String,
    required: true,
    unique: true
  }
});

const Lookup = mongoose.model('Lookup', lookupSchema);

function validateLookup(lookup) {
  const schema = Joi.object({
    description: Joi.string().required(),
    type: Joi.string().required()
  });
  const validation = schema.validate(lookup);
  return validation;
}

exports.Lookup = Lookup; 
exports.validateLookup= validateLookup;