const ytdl = require('ytdl-core');
const express=require('express')
const fs=require('fs')
const app=express()
const port=5000;
const ffmpeg = require('fluent-ffmpeg');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* app.get('/dl',(req,res)=>{
  // get video and write it into the res chunk by chunk
  if(ytdl.validateURL(req.query.videolink)){
  
  const nameFromQuery=req.query.name || 'youtubevideo'
  const mimeFromQuery=req.query.mime || 'mp4'

  res.header('Content-Disposition', 'attachment; filename='+nameFromQuery+'.'+mimeFromQuery);
  //console.log(req.query.videolink)
  let options=extractOptions(req.query.options)
  //console.log(options)
  
  getVideo(req.query.videolink,options,(chunk)=>{
    res.write(chunk)
  },()=>{
    res.end()
  })
  }else{
    res.status(500)
    res.send({message: 'NOT A YOUTUBE URL'})
  }
}) */


app.get('/dl',(req,res)=>{
  //return res.send(req.query.videolink)
  // get video and write it into the res chunk by chunk
  if(ytdl.validateURL(req.query.videolink)){
  
  const options=extractOptions(req.query.options)

  const mimeFromQuery=req.query.mime || 'mp4'


  let videoStream=ytdl(req.query.videolink, options)

  videoStream.on('info',(info)=>{
    let nameFromQuery;
    if(req.query.name){
      // sanatize string make it ascii only
      nameFromQuery=req.query.name.replace('|','').replace(/[^\x00-\x7F]/g, "");
    }
    else if(info.player_response.videoDetails.title){
      // sanatize string make it ascii only
      nameFromQuery=info.player_response.videoDetails.title.replace('|','').replace(/[^\x00-\x7F]/g, "");      
    }
    else{
      nameFromQuery='youtubevideo';
    }

    res.header('Content-Disposition', 'attachment; filename='+nameFromQuery+'.'+mimeFromQuery);
  })


  videoStream.pipe(res);


  }else{
    res.status(500)
    res.send({message: 'NOT A YOUTUBE URL'})
  }
})


app.get('/dlmp3',(req,res)=>{
  if(ytdl.validateURL(req.query.videolink)){

  const nameFromQuery=req.query.name || 'youtubevideo'
  const mimeFromQuery=req.query.mime || 'mp3'

  res.header('Content-Disposition', 'attachment; filename='+nameFromQuery+'.'+mimeFromQuery);
  let options=extractOptions(req.query.options)
  const url=req.query.videolink
  stream = new ffmpeg(ytdl(url,options))

stream.on('error', function (err) {
  res.send('something went wrong')
})
.format('mp3').pipe(res)

  }else{
    res.status(500)
    res.send({message: 'NOT A YOUTUBE URL'})
  }
})

extractOptions=(str)=>{
  //create object from send query
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
  // send all info from api
  if(ytdl.validateURL(req.query.videolink)){
    let urlParts=req.query.videolink.split('/watch?v=')
  if(urlParts[1]===undefined){
    urlParts=req.query.videolink.split('outu.be/')
  }
  ytdl.getInfo(req.query.videolink,(error, info)=>{
    if(error){
      throw error
    }
    res.send(JSON.stringify(info))
  })
  }else{
    res.status(500)
    res.send({message: 'NOT A YOUTUBE URL'})
  }
  
})
/* 
app.get('/simpleinfo',(req,res)=>{
  // send only basic info needed for the front end to save some data
  if(ytdl.validateURL(req.query.videolink)){
  ytdl.getInfo(req.query.videolink,(error, info)=>{
    if(error){
      //throw error
    }
    const simpleInfo=
        {thumbnail:info.player_response.videoDetails.thumbnail.thumbnails[2].url || "",
        title:info.title,
        length:info.length_seconds, 
        formats: []}
      if(info.formats){
        info.formats.map(format=>{
          simpleInfo.formats.push(
            {type: format.type.split(';')[0],
            videoOnly: format.audioBitrate===null,
            quality: format.resolution==null? format.audioBitrate+' bitrate' : format.resolution,
            itag: format.itag,
            url: format.url
            })
        })
      }
    res.send(simpleInfo)
  })
  }else{
    res.status(500)
    res.send({message: 'NOT A YOUTUBE URL'})
  }
})
 */

app.get('/simpleinfo',(req,res)=>{
  // send only basic info needed for the front end to save some data
  if(ytdl.validateURL(req.query.videolink)){
  ytdl.getInfo(req.query.videolink,(error, info)=>{
    if(error){
      //throw error
    }
    const simpleInfo=
      {
        thumbnail:info.player_response.videoDetails.thumbnail.thumbnails[2].url || "",
        title:info.title,
        length:info.length_seconds, 
        formats: []
      }
      if(info.formats){
        info.formats.map(format=>{
          simpleInfo.formats.push(
            {
              type: format.type.split(';')[0],
              videoOnly: format.audioBitrate===null,
              quality: format.resolution==null? format.audioBitrate+' bitrate' : format.resolution,
              itag: format.itag,
              url: format.url
            })
        })
      }
      //const simpleInfo=info;
      //console.dir(info)
    res.send(simpleInfo)
  })
  }else{
    res.status(500)
    res.send({message: 'NOT A YOUTUBE URL'})
  }
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

app.listen(port,()=>{
  console.log(`server running on port ${port}`)
})