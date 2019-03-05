/**
 * 二叉树遍历
 * 镜像二叉树
 */

function Node(val = null) {
	this.val = val
	this.left = null
	this.right = null
}


// 二叉树前序遍历

function PreOrder(root) {

	const stack = []
	stack.push(root)

	while(stack.length != 0){
		let node = stack.pop()
		// 对node进行操作
		console.log(node.val)

		if(node.right != null)
			stack.push(node.right)

		if(node.left != null)
			stack.push(node.left)
	}
}


// 二叉树中序遍历

function InOrder(root) {
	const stack = []
	let node = root

	while(stack.length != 0 || node != null){
		while(node){
			stack.push(node)
			node = node.left
		}

		// 左子树存储完毕
		const node = stack.pop()
		// 操作

		console.log(node.val)

		// 开始右子树

		node = node.right
	}
}



// 二叉树后序遍历

function PostOrder(root){


	const stack = []
	let node = root
	let lastTraveled = null

	while(stack.length != 0 || node != null){
		// 左子树全部入栈	
		while(node){
			stack.push(node)
			node = node.left
		}
		
		let topNode = stack[stack.length - 1]
		if(topNode.right === null || topNode.right === lastTraveled){
			stack.pop()
			//操作node
			console.log(topNode.val)

			lastTraveled = topNode
		}else{
			node = node.right
		}

	}
}

// 按层遍历

function TravelByLevel(root){
	let queue = []
	let node = root
	while(node != null || queue.length != 0){
		// 操作node
		if(queue.length != 0)
			node = queue.shift()

		if(node.left){
			queue.push(node.left)
		}

		if(node.right){
			queue.push(node.right)
		}


	}
}


const root = new Node("root")
root.left = new Node("left")
root.right = new Node("right")

root.left.left = new Node("left.left")
root.left.right = new Node("left.right")


// 镜像二叉树
function MirrorBinaryTree(root){

	if(root === null)
		return root
	let left = MirrorBinaryTree(root.left)
	let right =  MirrorBinaryTree(root.right)

	root.left = right
	root.right = left

	return root
}

console.log(root)
console.log(MirrorBinaryTree(root))





