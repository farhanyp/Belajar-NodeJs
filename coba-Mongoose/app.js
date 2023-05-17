require('./utils/db')
const express = require('express')
const expressLayouts = require("express-ejs-layouts");
const {body, validationResult, check} = require('express-validator');
const methodOverride = require('method-override')
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require('connect-flash');
const Mahasiswa = require('./model/mahasiswa')
const Contact = require('./model/contact')


const app = express()
const port = 3000

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

app.use(cookieParser('secret'))
app.use(session({
  cookie: { maxAge: 6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))
app.use(flash())

app.get('/', async (req,res) => {
    const mahasiswa = await Mahasiswa.find()
    res.render("index", {
        title: "Home",
        layout: "layouts/main-layouts",
        mahasiswa
    })
})

app.get('/about', (req,res) => {
    res.render("about", {
        title: "About",
        layout: "layouts/main-layouts"
    })
})



app.get('/contact', async(req,res) => {
    const contacts = await Contact.find()
    res.render("contact", {
        title: "Contact",
        layout: "layouts/main-layouts",
        contacts: contacts,
        msg: req.flash('message'),
    })
})

app.post('/contact', [
    body('nama').custom ( async value => {
        const result = await Contact.findOne({nama: value})
        if(result){
          throw new Error('nama sudah digunakan');
        }
        return true
      }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'nomor HP tidak valid').isMobilePhone('id-ID')
], (req,res)=> {
    const result = validationResult(req);
    if(result.errors.length != 0){
        res.render("save-contact", {
          title: "save contact",
          layout: "layouts/main-layouts",
          errors: result.array()
        });
      }else{
        Contact.insertMany([req.body])
        req.flash('message', 'data berhasil ditambahkan')
        res.redirect("/contact")
      }
})

app.get('/contact/add', async(req,res) => {
    res.render("save-contact", {
        title: "Save Contact",
        layout: "layouts/main-layouts",
    })
})

app.get('/contact/:user', async(req,res) => {
    const details = await Contact.findOne({nama: req.params.user})
    res.render('detail-contact', {
        title: "Detail Contact",
        layout: "layouts/main-layouts",
        detail: details
    })
})

app.delete('/contact', async(req, res) => {
    const contact = await Contact.deleteOne({_id: req.body._id})
    req.flash('message', 'data berhasil dihapus')
    res.redirect("/contact")
})

app.get("/contact/edit/:userId", async(req,res)=> {
    const userContact = await Contact.findOne({_id: req.params.userId})
    res.render("edit-contact", {
      title: "edit contact",
      layout: "layouts/main-layouts",
      user: userContact
    });
  })

  app.put("/contact",[
    body('nama').custom(async value => {
      const result = await Contact.findOne({nama: value})
      if(result){
        throw new Error('nama sudah digunakan');
      }
      return true
    }),
    check('email', 'Email tidak valid').isEmail(),
    check('nohp', 'nomor HP tidak valid').isMobilePhone('id-ID')
  ] ,async(req, res) => {
    const result = validationResult(req);
    if(result.errors.length != 0){
      res.render("edit-contact", {
        title: "edit contact",
        layout: "layouts/main-layouts",
        errors: result.array(),
        user: result
      });
    }else{
        await Contact.updateOne(
            {_id: req.body._id},
            {$set:{
                nama: req.body.nama,
                email: req.body.email,
                nohp: req.body.nohp
            }}
            )
        console.log(req.body)
        req.flash('message', 'data berhasil diubah')
        res.redirect("/contact")
    }
  });

app.listen(port,() => {
    console.log(`Contact App With MongoDB | Listening on port at http://localhost:${port}`)
})