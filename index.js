function merge(left, right) {
    let sortedArr = []
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        sortedArr.push(left.shift())
      } else {
        sortedArr.push(right.shift())
      }
    }
    return [...sortedArr, ...left, ...right]
  }

function mergeSort (arr){
    let mid = Math.floor(arr.length / 2)
    let left =arr.slice(0, mid);
    let right = arr.slice(mid, arr.length)
    
    if(arr.length === 1) {
        return arr

    } else {
        return merge(mergeSort(left), mergeSort(right));
    }
    
}

function deleteRec(root, value){
  if (root === null)
      return root;

  if (value < root.data)
      root.left = deleteRec(root.left, value);
  else if (value > root.data)
      root.right = deleteRec(root.right, value);
  else {
      if (root.left === null)
          return root.right;
      else if (root.right === null)
          return root.left;

      
      root.data = minValue(root.right);

      // Delete the inorder successor
      root.right = deleteRec(root.right, root.data);
  }
  return root;
}
function   minValue(node) {
  let minv = node.data;
  while (node.left !== null) {
      minv = node.left.data;
      node = node.left;
  }
  return minv;
}


function insertRec(root, key) {
  if (root == null) {
    root = new TreeNode(key);
    return root;
}


if (key < root.data)
    root.left = insertRec(root.left, key);
else if (key > root.data)
    root.right = insertRec(root.right, key);

return root;
}

class TreeNode {

    constructor(data) {
      this.data = data;
      this.left = null;
      this.right= null
    }
  
  }

class Tree {
    constructor(arr) {
        this.array = arr;
        this.root = buildTree(mergeSort([...new Set(arr)]));
    }
    insert(value) {
      this.root = insertRec(this.root, value)
    }
    
    
    delete(value) {
      this.root = deleteRec(this.root, value)
    }

    find(value, root = this.root) {
      if (value == root.data) 
        return root
      if (value > root.data) 
        return this.find(value, root.right)
      else if (value < root.data) 
        return this.find(value, root.left)
    }

    levelOrder(callback) {
      let cb = undefined;
      cb = callback;
      let nodeArr = [];
      let q = [this.root];

    while(q.length > 0){
      let size = q.length;
      while(size > 0){
          let node = q.shift();
          
          nodeArr.push(node);
          
          node.left && q.push(node.left);
          node.right && q.push(node.right);
          size--;
      }
    }

      if (cb != undefined){
        return nodeArr.forEach(node => {
          callback(node)
        });
      } else {
        return nodeArr
      } 
    }

    inOrder(callback, node = this.root, nodeArr = []) {
      if (node == null) return
      this.inOrder(callback, node.left)
      if (callback != undefined) {
        callback(node)
      } else nodeArr.push(node)
      this.inOrder(callback, node.right);
    }

    preOrder(callback, node = this.root, nodeArr = []) {
      if (node == null) return
      if (callback != undefined) {
        callback(node)
      } else nodeArr.push(node)
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }

    postOrder(callback, node = this.root, nodeArr = []) {
      if (node == null) return
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      if (callback != undefined) {
        callback(node)
      } else nodeArr.push(node)
    }

    findHeight(node) {
      if (node == null) return -1

     let leftHeight = this.findHeight(node.left)
     let rightHeight = this.findHeight(node.right)

     return Math.max(leftHeight, rightHeight) + 1
    }

    findDepth(x, root = this.root) {
      if (root == null)
      return -1;
      var dist = -1;
      if ((root.data == x)||
      (dist = this.findDepth(x, root.left)) >= 0 || 

      (dist = this.findDepth(x, root.right)) >= 0)
        return dist + 1;
      
      return dist;
    }

    isBalanced(root = this.root) {
      if (root == null) return
      if (this.findHeight(root.left) - this.findHeight(root.right) > 1 || 
      this.findHeight(root.right) - this.findHeight(root.left) > 1 ) {
        console.log('This Tree is NOT balanced')
      } else {
        console.log('This Tree is perfectly balanced')
      }
    }

    rebalance(){
      let newArr = this.levelOrder();
      let dataArr = [];
      newArr.forEach(node => {
        dataArr.push(node.data)
      })
      this.root = buildTree(dataArr)
    }
}

function buildTree(arr) {
  if (arr.length == 0) {
    return null
  } else {
    let mid = Math.floor(arr.length / 2);
    let root = new TreeNode(arr[mid]);
    let left =arr.slice(0, mid);
    let right = arr.slice(mid+1, arr.length)
    root.left = buildTree (left);
    root.right = buildTree(right);

    return root
  }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


/// Driver script time

function randNumArr (length){
  let randArr= [];
  for (let i = 0; i < length; i++) {
    randArr.push(Math.floor((Math.random() * 100)))
  }
  return randArr
}

function unbalancer (root) {
  let randomNum = Math.floor((Math.random() * 500))
  if (root.right == null) {
    root.right = new TreeNode(randomNum)
  }else {
    unbalancer(root.right)
  }
  

}


let testTree = new Tree(randNumArr(3)); // 1

console.log(prettyPrint(testTree.root))

testTree.isBalanced()  // 2

testTree.levelOrder(console.log) // 3
testTree.preOrder(console.log)
testTree.postOrder(console.log)
testTree.inOrder(console.log)


for (let i = 0; i < 6; i++) { // 4
  unbalancer(testTree.root);
}
console.log(prettyPrint(testTree.root))

testTree.isBalanced() // 5

testTree.rebalance() // 6

testTree.isBalanced() // 7


testTree.levelOrder(console.log) // 8
testTree.preOrder(console.log)
testTree.postOrder(console.log)
testTree.inOrder(console.log)