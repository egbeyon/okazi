const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const fieldSchema = new Schema({
  project: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
    
  },
  longitude: {type: Number},
  latitude: {type: Number},
  elevation: {type: Number},
  locality: {type: String},
  rockName: {
    type: String,
    
  },
  rockType: {
    type: String,
    
  },
  mineralogy: {type: String},
  texture: {
    type: String},

  color: {
      type: String},

  Dip: {type: Number},

  Strike: {type: Number},

  remark: {type: String},

  date: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true})

module.exports= fieldData = mongoose.model('fieldData', fieldSchema)

 
