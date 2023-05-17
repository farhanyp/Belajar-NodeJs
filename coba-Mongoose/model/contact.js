const mongoose = require('mongoose');
const { Schema } = mongoose;

  const Contact = mongoose.model("Contact", {
    _id: Schema.Types.ObjectId,
    nama: String,
    email: String,
    nohp: String
  })

  module.exports = Contact