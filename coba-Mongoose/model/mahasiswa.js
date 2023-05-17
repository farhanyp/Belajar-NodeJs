const mongoose = require('mongoose');
const { Schema } = mongoose;

const Mahasiswa = mongoose.model("Mahasiswa", {
    _id: Schema.Types.ObjectId,
    nama: String
})

// const Mahasiswa1 = new Mahasiswa({
//     _id: new mongoose.Types.ObjectId,
//     nama: "Farhan Yudha Pratama"
// })

module.exports = Mahasiswa