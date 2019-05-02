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
  let urlParts=req.query.videolink.split('/watch?v=')
  if(urlParts[1]===undefined){
    urlParts=req.query.videolink.split('outu.be/')
  }
  res.header('Content-Disposition', 'attachment; filename='+urlParts[1]+'.flv');
  console.log(req.query.videolink)
  let options=extractOptions(req.query.options)
  console.log(options)
  
  getVideo(req.query.videolink,options,(chunk)=>{
    res.write(chunk)
  },()=>{
    res.end()
  })
  
})

extractOptions=(str)=>{
  let output={}
  if(str){
    optionArr=str.split(',')
    optionArr.forEach(option=>{
    let entry=option.split(':')
    output[entry[0]]=entry[1]
  })
  }
  return output
}


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
    console.log(info.thumbnail_url)
    res.send(JSON.stringify(info))
  })
  
  
})
 
getVideo=(url,options,callback, end)=>{
  this.options=options? options: null
  ytdl(url,this.options)
  .on('data',(chunk)=>{
    callback(chunk)
  }).on('end',()=>{
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