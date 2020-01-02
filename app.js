const express=require('express')
const donwloader=require('./downloader')
const app=express()
const port=80;



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/ytdl", donwloader);






app.get('/',(req, res)=>{
	res.send("welcome to my youtube API");
});

app.listen(port,()=>{
  console.log(`server running on port ${port}`)
})