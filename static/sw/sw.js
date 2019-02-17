console.log("verson 3")

self.addEventListener("message",(event)=>{
    if(evev.data.action === 'skipWaiting')
        self.skipWaiting()
})