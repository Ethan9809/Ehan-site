/**
 *  正向建链
 *  逆向建链
 *  反转链表
 */

function Node(val, next = null) {
	this.val = val
	this.next = next
}

// 正向建立链表
function createLinkedNode1(data = []) {
	let dummyHead = new Node()
	let tail = dummyHead
	data.forEach(
		createNode
	)
	return dummyHead.next

	function createNode(item) {
		let node = new Node(item)
		tail = tail.next = node
	}
}


// 逆向建立链表

function createLinkedNode2(data = []) {
	let tail = null
	data.forEach(
		function (item) {
			tail = new Node(item,tail)
		}
	)
	return tail
}



// 反转链表

// 方法一 递归

function reverseLinkedNode(head){

	if(head === null || head.next === null)
		return head

	const cur = head
	let ret = reverseLinkedNode(head.next)
	let p = ret

	while(p.next != null)
		p = p.next
	
	p.next = cur
	cur.next = null
	
	return ret
}


// 方法二 三指针

function reverseLinkedNode(head){

	if(head === null || head.next === null)
		return head

	let pre = null
	let cur = head
	let next = head.next
	
	while(cur!=null){
		cur.next = pre
		pre = cur
		cur = next
		next = next.next
	}

	return pre
	

}





