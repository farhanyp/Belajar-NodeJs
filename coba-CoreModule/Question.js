const readline = require("node:readline");
const fs = require("node:fs");
// const { stdin: input, stdout: output } = require("node:process");
// const rl = readline.createInterface({ input, output });
const validator = require("validator");

// const Questions = (question) => {
//   return new Promise((resolve, rejects) => {
//     try {
//       rl.question(question, (answer) => {
//         resolve(answer);
//       });
//     } catch (err) {
//       rejects(err);
//     }
//   });
// };

const loadData = () => {
  if (!fs.existsSync("./data/data.json")) {
    fs.mkdirSync("./data");
    fs.writeFileSync("./data/data.json", "[]");
  } else {
    return JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));
  }
};

const removeDataJson = () => {
  fs.writeFileSync("./data/data.json", "[]");
  console.log("Semua data berhasil di hapus");
};

const showDataJson = () => {
  const file = loadData();
  file.map((res, index) => {
    console.log(index + 1, ". ", res.nama, "---", res.nohp);
  });
};

const removeDetailDataJson = (name) => {
  const file = loadData();
  const newContactFilter = file.filter((res) => {
    return res.nama.toLowerCase() !== name;
  });

  if (file.length === newContactFilter.length) {
    console.log("tidak ada nama yang sama");
  } else {
    fs.writeFileSync("./data/data.json", JSON.stringify(newContactFilter));
    console.log("data berhasil di hapus");
  }
};

const detailDataJson = (name) => {
  const file = loadData();
  const showdata = file.find((res) => {
    return res.nama.toLowerCase() === name;
  });

  if (showdata) {
    console.log(showdata.nama, "---", showdata.nohp);
  } else {
    console.log("data tidak ada");
  }
};

const sendToJson = (data) => {
  const file = loadData();
  const CheckClone = file.find((item) => {
    return item.nama == data.nama;
  });

  // Validasi Duplikasi
  if (CheckClone) {
    return false;
  }

  // Validasi Email
  if (!validator.isEmail(data.email)) {
    return false;
  }

  // Validasi Hp
  if (!validator.isMobilePhone(data.nohp, "id-ID")) {
    return false;
  }

  file.push(data);
  fs.writeFileSync("./data/data.json", JSON.stringify(file));
  console.log("data berhasil di kirim");
};

module.exports = {
  sendToJson,
  removeDataJson,
  showDataJson,
  detailDataJson,
  removeDetailDataJson,
};
