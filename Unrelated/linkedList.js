const listOne = {
  val: 1,
  next: {
    val: 5,
    next: {
      val: 7,
      next: null,
    },
  },
};

const listTwo = {
  val: 1,
  next: {
    val: 2,
    next: {
      val: 4,
      next: {
        val: 8,
        next: null,
      },
    },
  },
};

const listThree = {
  val: 3,
  next: {
    val: 6,
    next: {
      val: 8,
      next: null,
    },
  },
};

function List(val) {
  this.val = val;
  this.next = null;
}

const mergeLists = (lists) => {
  const nodeValues = [];

  for (let i = 0; i < lists.length; i++) {
    let curList = lists[i];
    while (curList) {
      nodeValues.push(curList.val);
      curList = curList.next;
    }
  }

  nodeValues.sort((a, b) => a - b);
  const mergedList = new List(nodeValues[0]);
  let currentNode = mergedList;
  for (let i = 1; i < nodeValues.length; i++) {
    currentNode.next = new List(nodeValues[i]);
    currentNode = currentNode.next;
  }

  return mergedList;
};

const mergeTwoLists = (list1, list2) => {
  let newList = new List(0);
  let cur = newList;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1;
      list1 = list1.next;
    } else {
      cur.next = list2;
      list2 = list2.next;
    }
    cur = cur.next;
  }

  cur.next = list1 ? list1 : list2;
  return newList.next;
};

const mergeListsOptimized = (lists) => {
  if (!lists.length) return null;

  while (lists.length > 1) {
    let lastList = lists.pop();
    lists[0] = mergeTwoLists(lists[0], lastList);
  }

  return lists[0];
};

//const newList = mergeLists([listOne, listTwo, listThree]);
const twoLists = mergeTwoLists(listOne, listTwo);
//const optimizedList = mergeListsOptimized([listOne, listTwo, listThree]);

const printList = (list) => {
  const values = [];
  while (list) {
    values.push(list.val);
    list = list.next;
  }

  console.log(values);
};

// printList(newList);
printList(twoLists);
//printList(optimizedList);

// const mergeLists = (lists) => {
//   let result = lists[0];

//   const insert = (node, list) => {
//     if (node.val < list.val) {
//       node.next = list;
//       list = node;
//     } else {
//       let curListItem = list.next;
//       while (curListItem) {
//         if (node.val < curListItem.val) {
//           node.next = curListItem;

//           break;
//         }
//         if (!curListItem.next) {
//           curList.next = node;
//           break;
//         }
//       }
//     }
//   };

//   for (let i = 1; i < lists.length; i++) {
//     let curList = lists[i];
//     while (curList) {
//       let curNode = { val: curList.val, next: null };
//       curList = curList.next;
//       console.log(curList);
//       insert(curNode, result);
//       console.log(result);
//     }
//   }

//   return result;
// };
