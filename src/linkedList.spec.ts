import { fromNodes, fromDataArray } from "./linkedList";
import faker from "faker";
import { Node, NodeMap, LinkedListData } from "./types";

export type VideoNodeData = { videoId: string };
export type VideoNode = Node<VideoNodeData>;
export type VideoNodeMap = NodeMap<VideoNodeData>;
export type PlaylistData = LinkedListData<VideoNodeData>;

describe("linked list functions", () => {
  test("it should not init the list", () => {
    const linkedList = fromNodes();
    const { getHeadId, getTailId, getLength } = linkedList;
    expect(getLength()).toEqual(0);
    expect(getHeadId()).toBeUndefined;
    expect(getTailId()).toBeUndefined;
  });

  test("it should init the list with a single node", () => {
    const node = createNode();
    const nodeMap: VideoNodeMap = {
      [node.id]: node
    };
    const linkedList = fromNodes(nodeMap);
    const { getHeadId, getTailId, getNodes, getLength } = linkedList;
    expect(getLength()).toEqual(1);
    const nodes = getNodes();
    expect(nodes[node.id]).toEqual(node);
    expect(getHeadId()).toEqual(node.id);
    expect(getTailId()).toEqual(node.id);
  });

  test("it should init the list with a single node", () => {
    const node: VideoNode = createNode();
    const linkedList = fromNodes({ [node.id]: node });
    const { getNodes, getTailId, getHeadId, getLength } = linkedList;
    expect(getLength()).toEqual(1);
    const nodes = getNodes();
    const {
      data: { videoId }
    } = nodes[node.id];
    expect(nodes[node.id]).toEqual(node);
    expect(videoId).toEqual(node.data.videoId);
    expect(getHeadId()).toEqual(node.id);
    expect(getTailId()).toEqual(node.id);
  });

  test("it should init the list with two nodes", () => {
    const firstNode: VideoNode = createNode();
    const lastNode: VideoNode = createNode();
    firstNode.nextNodeId = lastNode.id;
    const nodeMap: VideoNodeMap = {
      [firstNode.id]: firstNode,
      [lastNode.id]: lastNode
    };
    const linkedList = fromNodes(nodeMap);
    const { getHeadId, getTailId, getNodes, getLength } = linkedList;
    expect(getLength()).toEqual(2);
    const nodes = getNodes();
    expect(nodes[firstNode.id]).toEqual(firstNode);
    expect(nodes[lastNode.id]).toEqual(lastNode);
    expect(getHeadId()).toEqual(firstNode.id);
    expect(getTailId()).toEqual(lastNode.id);
  });

  test("it should add a single node with the correct input", () => {
    const linkedList = fromNodes({});
    const videoId = faker.random.uuid();
    const id = linkedList.addNode(videoId);
    const { getNodes, getHeadId, getTailId, getLength } = linkedList;
    const nodes = getNodes();
    const node = nodes[id];
    expect(getHeadId()).toEqual(node.id);
    expect(getTailId()).toEqual(node.id);
    expect(getLength()).toEqual(1);
    expect(nodes[id]).toBeUndefined;
  });

  test("it should add two nodes, and the first one's nextId should be qual to the secod id", () => {
    const linkedList = fromNodes({});
    const firstVideoId = faker.random.uuid();
    const firstId = linkedList.addNode(firstVideoId);
    const secondVideoId = faker.random.uuid();
    const secondId = linkedList.addNode(secondVideoId);
    const { getNodes, getHeadId, getTailId } = linkedList;
    const nodes = getNodes();
    expect(nodes[firstId].nextNodeId).toEqual(secondId);
    expect(getHeadId()).toEqual(firstId);
    expect(getTailId()).toEqual(secondId);
  });

  test("it should delete a node by its id", () => {
    const node: VideoNode = createNode();
    const linkedList = fromNodes({ [node.id]: node });
    let { getLength, getTailId, getHeadId, getNodes } = linkedList;
    const nodes = getNodes();
    expect(nodes[node.id]).toEqual(node);
    linkedList.removeNode(node.id);
    expect(nodes[node.id]).toBeUndefined;
    expect(getHeadId()).toBeUndefined;
    expect(getTailId()).toBeUndefined;
    expect(getLength()).toBe(0);
  });

  test("it should move node1 after node3", () => {
    const linkedList = fromDataArray(getDataArray(3));
    let {
      getLength,
      getTailId,
      getHeadId,
      getNodes,
      moveNodeAfter
    } = linkedList;
    const nodes = getNodes();
    const [node1, node2, node3] = Object.values(nodes);
    moveNodeAfter({ afterNodeId: node3.id, sourceNodeId: node1.id });
    expect(getLength()).toBe(3);
    expect(nodes[node2.id].nextNodeId).toEqual(node3.id);
    expect(nodes[node3.id].nextNodeId).toEqual(node1.id);
    expect(nodes[node1.id].nextNodeId).toBeUndefined;
    expect(getHeadId()).toEqual(node2.id);
    expect(getTailId()).toEqual(node1.id);
  });

  test("it should move node3 before node1", () => {
    const linkedList = fromDataArray(getDataArray(3));

    let {
      getLength,
      getTailId,
      getHeadId,
      getNodes,
      moveNodeBefore
    } = linkedList;
    const nodes = getNodes();
    const [node1, node2, node3] = Object.values(nodes);
    moveNodeBefore({ beforeNodeId: node1.id, sourceNodeId: node3.id });
    expect(getLength()).toBe(3);
    expect(nodes[node3.id].nextNodeId).toEqual(node1.id);
    expect(nodes[node1.id].nextNodeId).toEqual(node2.id);
    expect(nodes[node3.id].nextNodeId).toBeUndefined;
    expect(getHeadId()).toEqual(node3.id);
    expect(getTailId()).toEqual(node2.id);
  });
});

test("it should move node3 before node2", () => {
  const linkedList = fromDataArray(getDataArray(4));

  let {
    getLength,
    getTailId,
    getHeadId,
    getNodes,
    moveNodeBefore
  } = linkedList;
  const nodes = getNodes();
  const [node1, node2, node3, node4] = Object.values(nodes);
  moveNodeBefore({ beforeNodeId: node2.id, sourceNodeId: node3.id });
  expect(getLength()).toBe(4);
  expect(nodes[node1.id].nextNodeId).toEqual(node3.id);
  expect(nodes[node3.id].nextNodeId).toEqual(node2.id);
  expect(nodes[node2.id].nextNodeId).toEqual(node4.id);
  expect(nodes[node4.id].nextNodeId).toBeUndefined;
  expect(getHeadId()).toEqual(node1.id);
  expect(getTailId()).toEqual(node4.id);
});

function createNode(): VideoNode {
  const videoId = faker.random.uuid();
  const nodeId = faker.random.uuid();
  return {
    updatedAt: new Date(),
    id: nodeId,
    data: { videoId }
  };
}

function getDataArray(length: number) {
  return Array.from({ length }, () => ({ videoId: faker.random.uuid() }));
}

export {};
