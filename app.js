const express=require('express')
const donwloader=require('./downloader')
/* const {searchVideo}=require('./search') */
const searchVideoSimple=require('./searchSimple')
const app=express()
const port=5000;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.use("/ytdl", donwloader);

app.use("/search", searchVideoSimple);

/* app.use("/searchfull", searchVideo); */





app.get('*', (req, res) => {
  //res.sendFile(path.join(__dirname = 'client/build/index.html'));
  res.sendFile('index.html',{root: `${__dirname}/client/build`})
})



app.listen(process.env.PORT || 5000,()=>{
  console.log(`running on port ${process.env.PORT}`)
})