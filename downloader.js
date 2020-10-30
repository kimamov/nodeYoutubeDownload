const express = require('express')
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const {
  pipeline
} = require('stream');

const router = express.Router();


router.get('/download', (req, res) => {
  if (ytdl.validateURL(req.query.videolink) || ytdl.validateID(req.query.videolink)) {

    const options = req.query.format ? {
      quality: Number(req.query.format)
    } : {};


    let videoStream = ytdl(req.query.videolink, options)


    videoStream.on('info', (info, format) => {
      let title = "youtubevideo";
      let mime = "mp4";
      if (req.query.name) {
        // sanatize string make it ascii only
        title = req.query.name.replace('|', '').replace(/[^\x00-\x7F]/g, "");
      } else if (info.player_response.videoDetails.title) {
        // sanatize string make it ascii only
        title = info.player_response.videoDetails.title.replace('|', '').replace(/[^\x00-\x7F]/g, "");
      }

      if (format && format.container) mime = format.container

      res.header('Content-Disposition', 'attachment; filename=' + title + '.' + mime);
    }).on("response", (data) => {
      /* console.log(data.headers) */
    }).on('error', (error) => {
      /* console.log(error) */
      return res.send.status(500).send('download failed')
    })

    return pipeline(videoStream, res, error => {
      if (error) return res.end('download failed', 500)
    })


  } else {
    res.status(404).send('NOT A YOUTUBE URL')
  }
})

router.get("/getsize", (req, res) => {
  if (ytdl.validateURL(req.query.videolink) || ytdl.validateID(req.query.videolink)) {
    const options = req.query.format ? {
      quality: Number(req.query.format)
    } : {};
    try {
      const videoStream = ytdl(req.query.videolink, options)
      const response = {}
      videoStream.on("info", (info, format) => {
        response.format = format;
      }).on("response", (data) => {
        if (data.headers["content-length"]) {
          response.size = data.headers["content-length"];
          return res.send(response)
        }
        return res.send("SIZE NOT FOUND", 404);
      }).on("error", () => {
        /* console.log(error) */
        return res.status(500).send("SOMETHING WENT WRONG")
      })
    } catch (e) {
      /* console.log(e); */
      res.status(500).send("SOMETHING WENT WRONG")
    }

  } else res.send("NOT A YOUTUBE URL", 404)
})




router.get('/downloadmp3', async (req, res) => {
  if (ytdl.validateURL(req.query.videolink) || ytdl.validateID(req.query.videolink)) {

    /* set format if was sent */
    const options = req.query.format ? {
      quality: Number(req.query.format)
    } : {};

    /* start download */
    const download = ytdl(req.query.videolink, options);


    /* set title  */
    download.on("info", (info) => {
      let title = req.query.name ? req.query.name : info.player_response.videoDetails.title;
      /* make title ascii only */
      title = title.replace('|', '').replace(/[^\x00-\x7F]/g, "");
      res.header('Content-Disposition', 'attachment; filename=' + title + '.mp3');
    }).on("error", (error) => {
      /* console.log("download failed... " + error) */
      return res.send("youtube download failed", 500)
    })



    stream = new ffmpeg(download)

    // handle tags on the frontend now
    /* if(req.query.title) stream.outputOptions('-metadata title="'+req.query.title+'"')
    if(req.query.artist) stream.outputOptions('-metadata artist="'+req.query.artist+'"') */

    stream.on('error', function (err) {
      return res.end('failed to load mp3')
    })


    return pipeline(stream.format('mp3'), res, error => {
      if (error) return res.status(500).end('stream failed or was closed')
    })

  } else {
    return res.status(404).send('NOT A YOUTUBE URL')
  }
})

extractOptions = (str) => {
  //create object from send query
  let output = {}
  if (str) {
    optionArr = str.split(',')
    optionArr.forEach(option => {
      let entry = option.split(':')
      output[entry[0]] = entry[1]
    })
  }
  return output
}


/* router.get('/info', (req, res) => {
  // send all info from api
  if (ytdl.validateURL(req.query.videolink) || ytdl.validateID(req.query.videolink)) {

    ytdl.getBasicInfo(req.query.videolink, (error, info) => {
      if (error) {
        res.status(500)
        res.send('could not get info')
      }
      return res.send(info)
    })
  } else {
    res.status(404)
    res.send('NOT A YOUTUBE URL')
  }

}) */


router.get('/simpleinfo', async (req, res) => {
  // send only basic info needed for the front end to save some data
  if (ytdl.validateURL(req.query.videolink) || ytdl.validateID(req.query.videolink)) {
    /* console.log("valid"); */
    try {
      const info=await ytdl.getInfo(req.query.videolink);
      
      const simpleInfo = {
        thumbnail: info.videoDetails.thumbnail.thumbnails[2].url || "",
        title: info.videoDetails.title,
        length: info.videoDetails.lengthSeconds,
        formats: [],
      }
      if (info.formats) {
        info.formats.map(format => {
          simpleInfo.formats.push({
            type: format.mimeType.split(';')[0],
            videoOnly: format.audioBitrate === null,
            qualityLabel: format.qualityLabel,
            audioBitrate: format.audioBitrate,
            itag: format.itag,
            url: format.url,
            container: format.container
          })
        })
      }
      return res.send(simpleInfo)
    } catch (error) {
      return res.status(500).send('could not get info')
    }
    
  } else {
    res.status(404).send('NOT A YOUTUBE URL')
  }
})

router.get('/formatlist', async (req, res) => {
  // send only updated formats since they the links fail after a while
  if (ytdl.validateURL(req.query.videolink) || ytdl.validateID(req.query.videolink)) {
    try {
      const info=ytdl.getInfo(req.query.videolink)

      const simpleInfo = {
        formats: []
      }
      if (info.formats) {
        info.formats.map(format => {
          simpleInfo.formats.push({
            type: format.type.split(';')[0],
            videoOnly: format.audioBitrate === null,
            quality: format.resolution == null ? (format.audioBitrate + ' bitrate') : format.resolution,
            itag: format.itag,
            url: format.url
          })
        })
      }
      res.send(simpleInfo)
    } catch (error) {
      res.status(500).send('could not get info')
    }
  } else {
    res.status(404)
    res.send('NOT A YOUTUBE URL')
  }
})

module.exports = router;