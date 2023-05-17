const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/mahasiswa').then(res => console.log("Database berhasil terkoneksi"));
