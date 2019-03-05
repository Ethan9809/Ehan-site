/**
 * sort
 */



 // BubbleSort

function BubbleSort(array){
  for(let i = 0 ; i < array.length - 1 ; i ++){
    
    for(let j = 0 ; j< array.length - i - 1 ; j ++){
      
      // 交换
      if(array[j + 1] < arr [j]){

        [arr[j+1],arr[j]] = [arr[j],arr[j+1]]
      }

    }
  }
}


// 2 

function SelectSort(array){
  for(let i = 0 ; i < array.length - 1 ; i ++){
    for(let j = i + 1 ; j < array.length; j ++){
      if(array[i] > array[j]){
        // 交换
        [array[i],array[j]] = [array[j],array[i]]
      }
    }
  }
}


// 3 
function InsertSort1(array){

  for(let i = 1; i < arr.length ; i ++){
    
    for(let j = i ; j > 0 ; j--){
      if(array[j] < array[j-1]){
        // exchange
        [array[j],array[j-1]] = [array[j-1],array[j]]

      }else{
        break
      }
    }
  }
}
function InsertSort2(array){
  for(let i = 1 ; i < array.length; i ++){
    
    let cur = array[i]
    for(let j = i - 1 ; j > -1 && array[j] > cur ; j --){
      array[j + 1] = array[j]
    }

    if(j != i -1)
      array[j+1] = cur

  }
}



// quickSort


function Qsort(array,l,r){

  if(l >= r)
    return
  
  let mid = Partation(array,l,r)
  Qsort(l,mid-1)
  Qsort(mid+1,r)
}

function Partation1(array,l,r){
  let mid = (r - l) * Math.random() | 0 + r

  ;[array[l],array[mid]] = [array[mid],array[l]] 
  // 交换
  let ll = l 
  for(let i = l + 1; i <= r ; i ++){
    if(array[i] <= array[l]){
      ll++
    }else{
      ;[array[ll+1],array[r]] = [array[r],array[ll]]
      r--,i--
    }
  }

  return mid

}







// mergeSort
function mergeSort(array,l,r){

  if(l >= r)
    return
  let mid = (r - l)/2 | 0 + l;
  mergeSort(l,mid)
  mergeSort(mid+1,r)

  __merge(array,mid,l,r)
}

function __merge(array,mid,l,r){
  let arr = []
  let pl = l
  let pm = mid + 1
  while(pl <= mid || pm <= r){
    if(pl <= mid && pm <= r){
      if(array[pl] <= array[pm]){
        array.push(pl)
        pl++
      }else{
        array.push(pm)
        pm++
      }
    }else if(pl <= mid){
      array.push(pl)
      pl++
    }else{
      array.push(pm)
      pm++
    }
  }
  for(let i = 0 ; i < arr.length ; i ++){
    array[l+i] = arr[i]
  }

}



// 堆排序

function HeapSort(array){

  let last = (array.length - 1) / 2 | 0
  for(let i = last ; i > -1 ; i --)
    shiftDown(array,i,arr.length - 1)
  for(let i = array.length - 1; i > 0 ; i --){
    [array[i],array[0]] = [array[0],array[i]]
  }

}

function shiftDown(array,start,end){

  while(start >= end){
    let i = 2 * start + 1
    if(i + 1 <= end && array[i + 1] > array[i])
      i++

    if(array[start] < array[i])
      [array[start],array[i]] = [array[i],array[start]],start=i
    else
      break
  }
}


// 希尔排序

function cellSort(array){
  let n = 4
  while(n > 0){

    __cellSort(array,n)
  }
}

function __cellSort(array,n){

  for(let i = n ; i < array.length ; i++){
    for(let j = i - n ; j > 0 ; j -= n){

      if(array[j] > array[j + n]){
        
        [
          array[j], array[j+n]
        ] = [
            array[j+n], array[j]
            ]
      }else
        break;
    }
  }
}

