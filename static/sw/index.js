if("serviceWorker" in navigator)
    navigator.serviceWorker.register('/sw.js',{scope:'/'})
      .then(function(registration){
        // 注册成功
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      
        if(registration.waiting){
          registration.waiting.postMessage({
            skipWaiting:true
          })
        }


      })
        // 注册失败
      .catch(function(error){
        console.log('ServiceWorker registration failed: ', error)
      })