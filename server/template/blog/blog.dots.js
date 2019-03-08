function createDots(dotsNum,parent){
  var frag = document.createDocumentFragment()
  for(var i = 0; i< dotsNum;i++){
    frag.appendChild(
      document.createElement("li")
    )
  }
  parent.appendChild(frag)
}
function initScroll(parent){
  window.addEventListener("scroll",function(){
    var top = document.documentElement.scrollTop
    var num = Math.ceil(top/400)
    for(var i = 0; i< parent.children.length;i++){
      parent.children[i].className = ""
    }
    for(var i = 0; i< num;i++){
      parent.children[i].className = "highlight"
    }
  })
}
function initClick(parent){
  parent.addEventListener("click",function(e){
    var index = Array.from(parent.children).findIndex((i)=>i===e.target)
    if(index === -1)
      return
    document.documentElement.scrollTop = (index + 1)*400
  })
}
function initDots(height,parent){
  // 计算原点个数
  var dotsNum = Math.ceil(height/400)
  createDots(dotsNum,parent)
  initScroll(parent)
  initClick(parent)
}

window.onload = function(){
  var HEIGHT = document.documentElement.scrollHeight - document.documentElement.clientHeight
  initDots(HEIGHT,document.getElementsByClassName("dots")[0])
  document.getElementById("back").onclick = function(){
    window.history.back(-1)
  }
}