const { MongoClient, ObjectId } = require("mongodb")

const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri)



const callMongoDB= async()=>{
  const dbName = "mahasiswa"
  const db =client.db(dbName)
  
  await client.connect()

  // Memasukan 1 data ke collection
  // db.collection('mahasiswa').insertOne(
  //   {
  //     nama:"yudha"
  //   }
  // )

  // Memasukan data sekaligus ke collection
  // await db.collection('mahasiswa').insertMany([
  //     {nama:"pratama"},
  //     {nama:"pratama yp"},
  //     {nama:"farhan yp"},
  //     {nama:"farhan yp yudha"}
  //   ])

    // Menampilkan isi dari database dengan filter
  // const resultFindFilter = await db.collection("mahasiswa").find({ _id: new ObjectId('6448493ed1814a3234512199')}).toArray()
  // console.log(resultFindFilter)


  // Menampilkan isi dari database
  // const resultFind = await db.collection("mahasiswa").find().toArray()
  // console.log(resultFind)

  // Menghapus 1 data mulai dari paling atas
  // const deleteResult = await db.collection('mahasiswa').deleteOne({nama:"farhan yp yudha"})

  // Menghapus beberapa data
  // const deleteManyResult = await db.collection('mahasiswa').deleteMany(
  //   {nama:"pratama yp"},
  //   {nama:"farhan yp"}
  // )

  // Mengubah data
  // const updateResult = await db.collection("mahasiswa").updateOne({ nama: "pratama" }, { $set: { nama: "pratamap" } });
  return 'done.'
}

// const db = client.db(dbName)
callMongoDB()
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .finally(() => client.close())