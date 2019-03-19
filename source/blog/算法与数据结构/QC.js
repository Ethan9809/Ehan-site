function QC1(array){

  __QC1(array,0,array.length - 1)
}

function __QC1(array,l,r){

  if(k >= r)
    return
  
  let k = __partation(array,l,r)
  __QC1(array,l,k-1)
  __QC1(array,k+1,r)
}

function __partation1(array,l,r){
  // 1 way
  let mid = ((r - l) * Math.random()) | 0 + l
  [array[l],array[mid]] [array[mid],array[l]]
  let j = l
  for(let i = l + 1 ; i <= r ; i ++){
    if(array[i] < array[l]){
      j++
      [array[j],array[i]] = [array[i],array[j]]
    }
  }
  [array[l],array[j]] = [array[j],array[l]]
  
}

function __partation2(array,l,r){

  let mid = ((l - r) * Math.random()) | 0 + l
  ;[array[l],array[mid]] = [array[mid],array[l]]

  let j = l + 1
  let i = r
  while(true){
    while(j <= r && array[j] < array[l])
      j++
    while(i >= j+1 && array[r] > array[l])
      i--
    
    if(j > i)
      break
    [array[j],array[i]] = [array[i],array[j]]
    j++,i--
  }
}


function QC3W(array,l,r){

  if(r - l <= 15)
    IS(array,l,r)


  let mid = ((r - l)*Math.random()) | 0 + l;
  [array[mid],array[l]] = [array[l],array[mid]]
  let lt = l // [l+1,lt]  小于
  let gt = r + 1 // [gt,r]  大于
  // (lt,gt)
  
  let i = l + 1
  while(i < gt){
    if(array[i] < array[l])
      i++,lt++
    else if(array[i] > array[l]){
      gt--
      [array[i],array[gt]] = [array[gt],array[i]]
    }else{
      i++
    }
  }
  [array[l],array[lt]] = [array[lt],array[l]]

  QC3W(array,l,lt-1)
  QC3W(array,gt,r)
  
}


function InsertSort(array,l,r){

  for(let i = l + 1; i <= r ; i++){
    let ins = array[i]
    for(let j = i ; j > 0; j --){
      if(array[j - 1 ] > ins)
        array[j] = ins
      else
        break
    }
    array[j] = ins
  }
}




function Node(val){
  this.val = val
  this.left = null
  this.right = null
}

function binarySearchTree(){
  this.root = null
}
binarySearchTree.prototype.add = function(val){
  if(this.root != null)
    this.__add(root,val)
  else
    this.root = new Node(val)
}
binarySearchTree.prototype.__add = function(node,val){
  if(node === null)
    return new Node(Val)

  else if(node.val > val){
    node.left = this.__add(node.left,val)
  }else{
    node.right = this.__add(node.right,val)
  }

  return node
}
binarySearchTree.prototype.__findMaxNode = function(node){
  while(node.right)
    node = node.right

  return node
}
binarySearchTree.prototype.delete = function(val){
  this.root = this.__delete(root,val)
}
binarySearchTree.prototype.__delete = function(node,val){
  if(node.val === val){
    // 如果 被删节点是一个叶子节点
    if(node.right === null && node.left === null)
      return null
    else if(node.left === null){
      return node.right
    }else if(node.right === null){
      return node.left
    }else{
      // 寻找左边最大的节点，代替原来节点
      let pre = __findMaxNode(node.left)
      node = this.__delete(node,pre.val)
      pre.left = node.left
      pre.right = node.right
      return pre
    }

  }else if(node.val > val){
    node.left = this.__delete(node.left,val)
  }else{
    node.right = this.__delete(node.right,val)
  }
}





function Search(array,l,r,val){
  
  while(l <= r){

    let mid = (r - l)/2 | 0 + l
    if(array[mid] === val)
      return mid
    else if(array[mid] > val){
      r = mid - 1
    }else{
      l = mid + 1
    }
  }
  return -1 
}











