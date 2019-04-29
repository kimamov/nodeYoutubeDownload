const fs = require('fs');
const ytdl = require('ytdl-core');
const express=require('express')
const app=express()
const port=5000;

app.get('/dl',(req,res)=>{
  getVideo(req.query.videolink,(id)=>{
    res.send(`downloading ${id}`)
  })
  
})

app.get('/download',(req,res)=>{
  //getVideo(req.query.videolink)
  //res.stream(ytdl(req.query.videolink).pipe(fs.createWriteStream('video.flv')))
  //res.download(`downloading ${req.query.videolink}`)
  learnBuffer(req.query.videolink,(chunk)=>{
    res.write(chunk)
    console.log('x')
  },()=>{
    res.end()
  })
  
})

 
getVideo=(url,callback)=>{
  const urlParts=url.split('/watch?v=')
  console.log(urlParts[1])
  ytdl(url)
  .pipe(fs.createWriteStream(`${urlParts[1]}.flv`));
  callback(urlParts[1])
}
learnBuffer=(url, callback, end)=>{
  ytdl(url)
  .on('data',(chunk)=>{
    callback(chunk)
  }).on('end',()=>{
    console.log('finished')
    end()
  })
  
}

app.listen(port,()=>{
  console.log(`server running on port ${port}`)
})