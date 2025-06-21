import busboy from "busboy";
import express from "express";
import * as Minio from 'minio'

const minioClient = new Minio.Client({
  endPoint: 'play.min.io',
  port: 9000,
  useSSL: true,
  accessKey: 'Q3AM3UQ867SPQQA43P2F',
  secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG',
})


let app = express();

const main = function() {
  //the initials(BucketName, the empty fields objecy and the fake sequelize object)
  let BucketName = "test";
  let fields = {};
  let sequelize = {
    create: function(anything, anything) {
    }
  }
  //create function
  app.get("/create", (req, res) => {
    let Busboy = busboy({
      headers: req.headers
    })
    minioClient.makeBucket(BucketName)
    //the collection of the file
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
    //the field function inserting the keys and values in th fields object e.g 
    //array=[fieldnam:value,fieldname:value,...]
    //fields ={
    // Title:"I am a title"
    //}
    Busboy.on("field", (fieldname, value) => {
      fields[fieldname = value]
    })
    Busboy.on("finish", () => {
      sequelize.create(fields.Title, fields.Description)
    })
    res.send("hello")
  })
  app.get("/getAll", (req, re) => {
    let results = minioClient.listObjectsV2(BucketName)
    res.send(results)
  })
}
app.get("/getOne", (req, res) => {
  let name = res.body
  let result = minioClient.getObject(BucketName, name);
  res.send(result)

})
app.delete("/delete/:name", (req, res) => {
  let id = req.params
  minioClient.removeObject(Bucketname, id)
})
//callling  the main function
main()
app.listen(3000, () => {
  console.log("on port 3000")
})

