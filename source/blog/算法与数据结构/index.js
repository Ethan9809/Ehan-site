function ListNode(val) {
      this.val = val;
      this.next = null;
}

const head = new ListNode(1)
head.next = new ListNode(2)
head.next.next = new ListNode(3)
head.next.next.next = new ListNode(4)
head.next.next.next.next = new ListNode(5)
var reverseBetween = function(head, m, n) {

    let pre = null,
        cur = head,
        ppre = null,
        nnext = null,
        next = head.next
    for(let i = 1; i <= n ; i++){
        if(i >= m){
            cur.next = pre
            pre = cur
            cur = next
            next = next && next.next
        }else{
            cur = next
            next = next.next
        }
        if( i === m - 1)
            ppre = pre
        if( i === n )
            nnext = cur
    }
    console.log(pre)
    if(ppre)
        ppre.next = pre
    else
        head = pre
    while(pre.next!=null)
        pre = pre.next
    pre.next = nnext
    return head

}
reverseBetween(head,2,4)