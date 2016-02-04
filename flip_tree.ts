#!/usr/bin/env typescript

class TreeNode {
  value: number;
  left: TreeNode;
  right: TreeNode;
  constructor(value: number, left?: TreeNode, right?: TreeNode) {
    this.value = value;
    this.left = left || null;
    this.right = right || null;
  }
}

class Tree {
  root: TreeNode;
  constructor(root: TreeNode) {
    this.root = root;
  }
  print() {
    var rtl = (this.root.right && this.root.right.right)
    var out = [[],[],[]];
    var cursor = this.root;
    while (cursor) {
      if (rtl) {
        out[0].push("→[" + cursor.value + "]");
        out[1].push(cursor.left ? "  ↓ " : '    ');
        out[2].push(cursor.left ? " [" + cursor.left.value + "]" : '    ');
        cursor = cursor.right;
      } else {
        out[0].unshift("[" + cursor.value + "]←");
        out[1].unshift(cursor.right ? " ↓  " : '    ');
        out[2].unshift(cursor.right ? "[" + cursor.right.value + "] " : '    ');
        cursor = cursor.left;
      }
    }
    for (let row of out) {
      console.log(row.join(''));
    }
    console.log();
  }

  transform(newLeft?: TreeNode, newRight?: TreeNode) {
    var nextLeft = this.root.right; // 2, 4, x, 8, x
    var nextRight = this.root;      // 1, 3, 5, 7, 9
    var nextRoot = this.root.left;  // 3, 5, 7, 9, x
    this.root.left = newLeft || null;
    this.root.right = newRight || null;
    if (nextRoot) {
      this.root = nextRoot;
      this.transform(nextLeft, nextRight);
    } else {
      return;
    }
  }
}

//        →[1]        [1]   [9]←[7]←[5]←[3]←[1]←
//         ↙ ↘        ↗           ↘       ↘   ↘
//       [3] [2]    [3]→[2]       [8]     [4] [2]
//       ↙ ↘       ↗
//     [5] [4]    [5]→[4]
//     ↙          ↗
//   [7]        [7]          →[9]→[7]→[5]→[3]→[1]
//   ↙ ↘        ↗             ↙       ↙   ↙
// [9] [8]   →[9]→[8]       [8]     [4] [2]

var _7 = new TreeNode(7, new TreeNode(9), new TreeNode(8));
var _5 = new TreeNode(5, _7);
var _3 = new TreeNode(3, _5, new TreeNode(4));
var _1 = new TreeNode(1, _3, new TreeNode(2));

var tree = new Tree(_1);
tree.print(); // initial
tree.transform();
tree.print(); // transformed

/*

[9]←[7]←[5]←[3]←[1]←
     ↓       ↓   ↓
    [8]     [4] [2]

→[9]→[7]→[5]→[3]→[1]
  ↓       ↓   ↓
 [8]     [4] [2]

*/
