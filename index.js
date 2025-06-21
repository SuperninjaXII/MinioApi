import busboy from "busboy";
import express from "express";
import * as Minio from 'minio'

let BucketName = "test";

let app = express();
let fields = {
}
let sequelize = {
  create: function(anything, anything) {
  }
}
const main = function() {
  const minioClient = new Minio.Client({
    endPoint: 'play.min.io',
    port: 9000,
    useSSL: true,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
  })
  app.get("/create", (req, res) => {
    let Busboy = busboy({
      headers: req.headers
    })
    minioClient.makeBucket(BucketName)

    Busboy.on("file", (fieldname, file, filename) => {
      minioClient.putObject(BucketName, "fakename.md", file, (err, etag) => {
        if (err) {
          console.log(err)
        }
        console.log(etag)
      })
    })
    Busboy.on("end", () => {
      console.log("uploading finished")
    })
    Busboy.on("field", (fieldname, val) => {
      fields[fieldname = val]
    })
    Busboy.on("finish", () => {
      sequelize.create(name, descriptionn)
    })

    res.send("hello")
  })
}
main()
app.listen(3000, () => {
  console.log("on port 3000")
})

