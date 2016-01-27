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
    var cursor = this.root
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

  transform(new_right?: TreeNode, new_left?: TreeNode) {
    var next_left = this.root.right // 2, 4, 6, x
    var next_right = this.root      // 1, 3, 5, 7
    var next_root = this.root.left  // 3, 5, 7, x
    this.root.right = new_right || null;
    this.root.left = new_left || null;
    if (next_root) {
      this.root = next_root;
      this.transform(next_right, next_left);
    } else {
      return;
    }
  }
}

//       [1]        [1]    [7]←[5]←[3]←[1]
//       ↙ ↘        ↗            ↘   ↘   ↘
//     [3] [2]    [3]→[2]        [6] [4] [2]
//     ↙ ↘        ↗
//   [5] [4]    [5]→[4]      [7]→[5]→[3]→[1]
//   ↙ ↘        ↗            ↙   ↙   ↙
// [7] [6]    [7]→[6]      [6] [4] [2]

var _5 = new TreeNode(5, new TreeNode(7), new TreeNode(6));
var _3 = new TreeNode(3, _5, new TreeNode(4));
var _1 = new TreeNode(1, _3, new TreeNode(2));

var tree = new Tree(_1);
tree.print(); // initial
tree.transform();
tree.print(); // transformed

/*

[7]←[5]←[3]←[1]←
     ↓   ↓   ↓
    [6] [4] [2]

→[7]→[5]→[3]→[1]
  ↓   ↓   ↓
 [6] [4] [2]

*/
