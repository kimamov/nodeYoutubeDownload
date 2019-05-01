const fs = require('fs');
const ytdl = require('ytdl-core');
const express=require('express')
const app=express()
const port=5000;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/dl',(req,res)=>{
  getVideo(req.query.videolink,(id)=>{
    res.send(`downloading ${id}`)
  })
  
})

app.get('/download',(req,res)=>{
  //getVideo(req.query.videolink)
  //res.stream(ytdl(req.query.videolink).pipe(fs.createWriteStream('video.flv')))
  //res.download(`downloading ${req.query.videolink}`)
  let urlParts=req.query.videolink.split('/watch?v=')
  if(urlParts[1]===undefined){
    urlParts=req.query.videolink.split('outu.be/')
  }
  res.header('Content-Disposition', 'attachment; filename='+urlParts[1]+'.flv');
  learnBuffer(req.query.videolink,(chunk)=>{
    res.write(chunk)
  },()=>{
    res.end()
  })
  
})
app.get('/audio',(req,res)=>{
  //getVideo(req.query.videolink)
  //res.stream(ytdl(req.query.videolink).pipe(fs.createWriteStream('video.flv')))
  //res.download(`downloading ${req.query.videolink}`)
  let urlParts=req.query.videolink.split('/watch?v=')
  if(urlParts[1]===undefined){
    urlParts=req.query.videolink.split('outu.be/')
  }
  res.header('Content-Disposition', 'attachment; filename='+urlParts[1]+'.mp3');
  audioDownload(req.query.videolink,(chunk)=>{
    res.write(chunk)
  },()=>{
    res.end()
  })
  
})
app.get('/audioonly',(req,res)=>{
  //getVideo(req.query.videolink)
  //res.stream(ytdl(req.query.videolink).pipe(fs.createWriteStream('video.flv')))
  //res.download(`downloading ${req.query.videolink}`)
  let urlParts=req.query.videolink.split('/watch?v=')
  if(urlParts[1]===undefined){
    urlParts=req.query.videolink.split('outu.be/')
  }
  res.header('Content-Disposition', 'attachment; filename='+urlParts[1]+'.mp3');
  audioDownload(req.query.videolink,(chunk)=>{
    res.write(chunk)
  },()=>{
    res.end()
  })
  
})
app.get('/info',(req,res)=>{
  //getVideo(req.query.videolink)
  //res.stream(ytdl(req.query.videolink).pipe(fs.createWriteStream('video.flv')))
  //res.download(`downloading ${req.query.videolink}`)
  let urlParts=req.query.videolink.split('/watch?v=')
  if(urlParts[1]===undefined){
    urlParts=req.query.videolink.split('outu.be/')
  }
  ytdl.getInfo(req.query.videolink,(error, info)=>{
    if(error){
      throw error
    }
    //console.log(info)
    res.send(JSON.stringify(info.formats))
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
    //console.log('finished')
    end()
  })
  
}
audioDownload=(url, callback, end)=>{
  ytdl(url,{filter: "audioonly",quality: 'lowest'})
  .on('data',(chunk)=>{
    callback(chunk)
  }).on('end',()=>{
    //console.log('finished')
    end()
  })
  
}


app.listen(port,()=>{
  console.log(`server running on port ${port}`)
})