const express=require('express')
const path = require('path');
const donwloader=require('./downloader')
/* const {searchVideo}=require('./search') */
const searchVideoSimple=require('./searchSimple')
const dlProxy=require("./dlProxy")
const app=express()
const port=process.env.PORT || 5000;


app.use(function(_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.use("/api/ytdl", donwloader);

app.use("/api/search", searchVideoSimple);

app.use("/api/dlproxy", dlProxy);





app.get('*', (_, res) => {
  res.sendFile('index.html',{root: `${__dirname}/client/build`})
})



app.listen(port,()=>{
  console.log(`running on port ${port}`)
})