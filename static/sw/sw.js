const verson = "1.0.0"

self.addEventListener("install",(event)=>{

    event.waitUntil(

        caches.open(`cache-${verson}`).then(cache=>{
            return cache.addAll([
                '/',
                "/assets/css/app.70b8789e.bundle.css",
                "/assets/js/app.b291d533.bundle.js",
                "/assets/img/avatar.562f81e3.jpg",
                "/assets/js/vendors~app.6f4540e5.bundle.js"
            ])
        })
    )
})

self.addEventListener("fetch",(event)=>{
    event.respondWith(
        caches.match(event.request).then((response)=>{
            if(response)
                return response
            
            const request = event.request.clone()
            
            return fetch(request).then((httpRes)=>{
                return httpRes                
            })
        })
    )
})