# linked-list-normalized

Linked list in a normalized data structure (refs by id)

# installation

npm i linked-list-normalized

# usage example

```
import list from 'linked-list-normalized';

// both will create a normalized linked list of: 1 -> 2 -> 3

const linkedList = list.fromDataArray([1, 2, 3]);

const linkedList = list.fromNodes(
    {id:1, data:1, nextnodeId:2},
    {id:2, data:2, nextnodeId:3},
    {id:3, data:3});
```

linkedList API:
addNode<br/>
removeNode<br/>
moveNodeAfter<br/>
moveNodeBefore<br/>
getNodes<br/>
getHeadId<br/>
getTailId<br/>
getLength
