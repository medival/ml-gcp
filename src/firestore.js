const { Firestore } = require("@google-cloud/firestore")
const db = new Firestore();

async function store_data() {
  const doctorsCollections = db.collection('dokter');
  console.log("Collections 'dokter' berhasil dibuat");

  const erosDoc = await doctorsCollections.doc("Dokter Eros");
  console.log("Dockument atas nama Dokter Eros berhasil dibuat");

  const profileEros = {
    nama: "dr. Eros",
    keahlian: "Dokter Kulit",
    almamater: "Universitas"
  }

  await erosDoc.set(profileEros);
  console.log("Data berhasil ditambahkan ke dokumen Eros");

  const erosSubCollections = erosDoc.collection("Konsultasi");
  console.log("Subcollection Konsultasi berhasil dibuat");

  const historyConsultations = {
    nama_pasien: {
      depan: "Antorny",
      belakang: "Gunawan",
    },
    waktu_konsultasi: Date.now().toString()
  }

  await erosSubCollections.doc("Antony").set(historyConsultations);
  console.log("Data berhasil ditambahkan");


  store_data().catch(console.error)
}

module.exports = { store_data }