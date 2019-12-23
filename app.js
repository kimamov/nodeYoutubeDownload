const ytdl = require('ytdl-core');
const express=require('express')
const fs=require('fs')
const app=express()
const port=80;
const ffmpeg = require('fluent-ffmpeg');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




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
  }).on('error',(error)=>{
    res.status(500)
    res.send(('download failed'))
  })


  videoStream.pipe(res);


  }else{
    res.status(404)
    res.send('NOT A YOUTUBE URL')
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
  res.status(500)
  res.send('failed to load video')
})
.format('mp3').pipe(res)

  }else{
    res.status(404)
    res.send('NOT A YOUTUBE URL')
  }
})

app.get('/downloadmp3',async (req,res)=>{
  if(ytdl.validateURL(req.query.videolink)){

  let title='youtube_mp3';
  if(req.query.name){
    title=req.query.name
  }else{
    const videoInfo=await ytdl.getBasicInfo(req.query.videolink);
    title=videoInfo.title;
  }
  const options=req.query.format? {format: req.query.format} : {};

  res.header('Content-Disposition', 'attachment; filename='+title+'.mp3');
  
  const download=ytdl(req.query.videolink, options);
  download.on("error",(error)=>{
    console.log("download failed... "+error)
    return res.send("youtube download failed", 500)
  })
  stream = new ffmpeg(download)

  stream.on('error', function (err) {
    console.log("was closed")
    console.log(err)
    res.status(500)
    return res.send('failed to load video')
  })
  .format('mp3').pipe(res)

  }else{
    res.status(404)
    res.send('NOT A YOUTUBE URL')
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
      res.status(500)
      res.send('could not get info')
    }
    res.send(JSON.stringify(info))
  })
  }else{
    res.status(404)
    res.send('NOT A YOUTUBE URL')
  }
  
})


app.get('/simpleinfo',(req,res)=>{
  // send only basic info needed for the front end to save some data
  if(ytdl.validateURL(req.query.videolink)){
  ytdl.getInfo(req.query.videolink,(error, info)=>{
    if(error){
      res.status(500)
      res.send('could not get info')
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
              quality: format.resolution==null? (format.audioBitrate+' bitrate') : format.resolution,
              itag: format.itag,
              url: format.url
            })
        })
      }

    res.send(simpleInfo)
  })
  }else{
    res.status(404)
    res.send('NOT A YOUTUBE URL')
  }
})

app.get('/formatlist',(req,res)=>{
  // send only updated formats since they the links fail after a while
  if(ytdl.validateURL(req.query.videolink)){
  ytdl.getInfo(req.query.videolink,(error, info)=>{
    if(error){
      res.status(500)
      res.send('could not get info')
    }
    const simpleInfo=
      {
        formats: []
      }
      if(info.formats){
        info.formats.map(format=>{
          simpleInfo.formats.push(
            {
              type: format.type.split(';')[0],
              videoOnly: format.audioBitrate===null,
              quality: format.resolution==null? (format.audioBitrate+' bitrate') : format.resolution,
              itag: format.itag,
              url: format.url
            })
        })
      }

    res.send(simpleInfo)
  })
  }else{
    res.status(404)
    res.send('NOT A YOUTUBE URL')
  }
})

app.get('/',(req, res)=>{
	res.send("welcome to my youtube API");
});

app.listen(port,()=>{
  console.log(`server running on port ${port}`)
})