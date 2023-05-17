const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {mahasiswa} = require('./data')
const {body, validationResult, check} = require('express-validator');
const { loadContacts, loadDetailContact, writeFile, cekDuplikasi, deleteFile, editFile, sendEditFile } = require('./utils/contact');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('connect-flash');
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({extended: true}))

// config flash
app.use(cookieParser('secret'))
app.use(session({
  cookie: { maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.get("/", (req, res) => {
  // Menggunakan ejs
  res.render("index", {
    title: "index",
    layout: "layouts/main-layouts",
    mahasiswa: mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    layout: "layouts/main-layouts",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContacts()
  res.render("contact", {
    title: "contact",
    layout: "layouts/main-layouts",
    contacts: contacts,
    msg: req.flash('message'),
  });
});

app.post('/contact',[
  body('nama').custom(value => {
    const result = cekDuplikasi(value)
    if(result){
      throw new Error('nama sudah digunakan');
    }
    return true
  }),
  check('email', 'Email tidak valid').isEmail(),
  check('nohp', 'nomor HP tidak valid').isMobilePhone('id-ID')
] ,(req, res) => {
  const result = validationResult(req);
  if(result.errors.length != 0){
    res.render("saveContact", {
      title: "save contact",
      layout: "layouts/main-layouts",
      errors: result.array()
    });
  }else{
  writeFile(req.body)
  req.flash('message', 'data berhasil ditambahkan')
  res.redirect("/contact")
  }
});

app.get("/contact/add", (req, res) => {
  res.render("saveContact", {
    title: "save contact",
    layout: "layouts/main-layouts",
  });
});

app.get("/contact/:idcontact", (req, res) => {
  const detail = loadDetailContact(req.params.idcontact)
  res.render("detail-contact",{
    title: "detail-contact",
    layout: "layouts/main-layouts",
    detail: detail
  })
});

app.get("/contact/delete/:user", (req,res)=> {
  deleteFile(req.params.user)
  req.flash("message", "Data berhasil di hapus")
  res.redirect("/contact")
})

app.get("/contact/edit/:user", (req,res)=> {
  const userContact = editFile(req.params.user)
  res.render("editContact", {
    title: "edit contact",
    layout: "layouts/main-layouts",
    user: userContact
  });
})

app.post("/edit",[
  body('nama').custom(value => {
    const result = cekDuplikasi(value)
    if(result){
      throw new Error('nama sudah digunakan');
    }
    return true
  }),
  check('email', 'Email tidak valid').isEmail(),
  check('nohp', 'nomor HP tidak valid').isMobilePhone('id-ID')
] ,(req, res) => {
  const result = validationResult(req);
  if(result.errors.length != 0){
    res.render("detail-contact", {
      title: "detail contact",
      layout: "layouts/main-layouts",
      errors: result.array()
    });
  }else{
  sendEditFile(req.body)
  req.flash('message', 'data berhasil diubah')
  res.redirect("/contact")
  }
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
