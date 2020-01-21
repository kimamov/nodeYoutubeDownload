const cheerio = require("cheerio");
const request = require("request-promise");


function searchYt(query, page){
    return new Promise((resolve, reject)=>{
        if(!query || typeof query!=="string") return reject(new Error("string query is required"))
        
        request({
            uri: `https://www.youtube.com/results?search_query=${query}${page? `&page=${page}`: ""}`,
        })
        .then(data => {
            const $ = cheerio.load(data);
            
            const videos=$('div.yt-lockup.yt-lockup-tile.yt-lockup-video.vve-check.clearfix', data);
    
            if(videos.length){
                const videoList=[];
                const currentPage=page || 1;
                for(let i=0; i<videos.length; i++){
                    const listItems=$("ul>li" ,videos[i]);

                    videoList.push({
                        uploaded: listItems[0].children[0].data,
                        views: listItems[1].children[0].data,
                        thumbnail: $("img", videos[i]).attr("src"),
                        duration: $("span", videos[i]).first().text().trim("\n"),
                        title: $("h3>a", videos[i]).first().text(),
                        
                        query: query,
                        page: page || 1,
                        nextPage:  `https://www.youtube.com/results?search_query=${query}&page=${currentPage+1}`
                    })
                }
                resolve(videoList);
            }
            
    
        })
        .catch(e => reject(e))
    })
    
}


//searchYt("tool", 2).then(data=>console.log(data)).catch(e=>console.log(e));

module.exports=searchYt