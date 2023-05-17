const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // Menggunakan sendfile untuk mengirim file beserta dengan path rootnya
  res.sendFile("./index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
});

// Use req params
app.get("/product/:id", (req, res) => {
  // Mengirim pesan
  res.send(`Id contact: ${req.params.id}`);
});

// Menggunakan middleware yang berfungsi jika url selain diatas makan akan di direct kemari
app.use("/", (req, res) => {
  // Mengirimkan status 404
  res.status(404);
  // Mengirim pesan
  res.send("Halaman ini tidak ada");
});

// Wajib dimasukan karena untuk menjalankan web server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
