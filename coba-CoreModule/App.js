const {
  sendToJson,
  removeDataJson,
  showDataJson,
  detailDataJson,
  removeDetailDataJson,
} = require("./Question");
const yargs = require("yargs");

// const Main = async () => {
//   const name = await contact.Questions("Masukan nama anda: ");
//   const email = await contact.Questions("Masukan email anda: ");
//   contact.sendToJson({ name, email });
// };

// Main();

yargs.command({
  command: "add",
  description: "Menambahkan kontak",
  builder: {
    nama: {
      demandOption: true,
      type: "string",
    },
    email: {
      demandOption: false,
      type: "string",
    },
    nohp: {
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    const contact = {
      nama: argv.nama,
      email: argv.email,
      nohp: argv.nohp,
    };
    sendToJson(contact);
  },
});

yargs.command({
  command: "remove",
  description: "Menghapus seluruh kontak",
  builder: {},
  handler() {
    removeDataJson();
  },
});

yargs.command({
  command: "remove-detail",
  description: "Menghapus salah satu kontak",
  builder: {},
  handler(argv) {
    removeDetailDataJson(argv.nama);
  },
});

yargs
  .command({
    command: "show",
    description: "Melihat seluruh kontak",
    builder: {},
    handler() {
      showDataJson();
    },
  })
  .demandCommand();

yargs.command({
  command: "show-detail",
  description: "Melihat salah satu kontak kontak",
  builder: {},
  handler(argv) {
    detailDataJson(argv.nama);
  },
});

yargs.parse();

// console.log(yargs.argv);
