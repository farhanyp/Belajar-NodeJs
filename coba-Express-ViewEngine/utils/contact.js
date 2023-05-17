const fs = require("node:fs")

    const file = fs.existsSync('./data/contact.json')
    if(!file){
        fs.mkdirSync('./data')
        fs.writeFileSync('./data/contact.json', '[]')
    }

const loadContacts = () => {
    const contact = JSON.parse(fs.readFileSync('./data/contact.json', 'utf-8'))
    return contact
}

const loadDetailContact = (name) => {
    const contacts = JSON.parse(fs.readFileSync('./data/contact.json', 'utf-8'))
    const user = contacts.find((contact) => {
        return contact.nama === name
    })
    return user
}

const writeFile = (contact) => {
    const contacts = JSON.parse(fs.readFileSync('./data/contact.json', 'utf-8'))
    contacts.push(contact)
    fs.writeFileSync('./data/contact.json', JSON.stringify(contacts))
}

const cekDuplikasi = (name) => {
    const contacts = JSON.parse(fs.readFileSync('./data/contact.json', 'utf-8'))
    const cek = contacts.find(contact => {
        return contact.nama.toLowerCase() === name.toLowerCase()
    })
    return cek
}

const deleteFile = (name) => {
    const contacts = JSON.parse(fs.readFileSync('./data/contact.json', 'utf-8'))
    const contact = contacts.filter((contact) => {
        return contact.nama !== name
    })
    fs.writeFileSync('./data/contact.json', JSON.stringify(contact))
}

const editFile = (name) => {
    const contacts = JSON.parse(fs.readFileSync('./data/contact.json', 'utf-8'))
    const contact = contacts.find((contact) => {
        return contact.nama === name
    })
    const file = contacts.filter((contact) => {
        return contact.nama !== name
    })

    fs.writeFileSync('./data/contact.json', JSON.stringify(file))
    return contact
}

const sendEditFile = (diffContact) => {
    const contacts = JSON.parse(fs.readFileSync('./data/contact.json', 'utf-8'))
    const file = contacts.filter((contact) => {
        return contact.nama !== diffContact
    })
    file.push(diffContact)
    fs.writeFileSync('./data/contact.json', JSON.stringify(file))
}

module.exports = { loadContacts, loadDetailContact, writeFile, cekDuplikasi, deleteFile, editFile, sendEditFile }