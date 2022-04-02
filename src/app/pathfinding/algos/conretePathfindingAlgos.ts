import { PriorityQueue, Queue, Stack } from '../models/agendaDataStructures';
import { ObjMap } from '../../shared/models/objMap';
import {
  GenNeighboursImpl,
  GridAnimationFrame,
  GridBarriers,
  GridWeights,
  initBlankGridWeights,
  Pos,
} from '../models/grid';
import { genericUnidirectionalSearch } from './genericPathfindingAlgos';
import {
  genAstarCmp,
  genDijkstraCmp,
  genManhattanCmp,
  genRandomCmp,
} from './cmps';

// Type alias that all algorithm implementations (i.e BFS, DFS) follow
export type ConcreteAlgoImpl = (
  startPos: Pos,
  goalPos: Pos,
  gridWeights: GridWeights,
  gridBarriers: GridBarriers,
  genNeighbours: GenNeighboursImpl
) => GridAnimationFrame[];

// A grid of weights where every weight is equal to 1, used to simulate unweighted algos
const blankGridWeights = initBlankGridWeights();

// Implementation of breadth first search by passing in a Queue to genericUnidirectionalSearch()
export function unidirectionalBFS(
  startPos: Pos,
  goalPos: Pos,
  _: GridWeights,
  gridBarriers: GridBarriers,
  genNeighbours: GenNeighboursImpl
): GridAnimationFrame[] {
  return genericUnidirectionalSearch(
    startPos,
    goalPos,
    new Queue<Pos>(),
    blankGridWeights,
    gridBarriers,
    genNeighbours,
    new ObjMap<Pos, number>([])
  );
}

// Implementation of depth first search by passing in a Stack to genericUnidirectionalSearch()
export function unidirectionalDFS(
  startPos: Pos,
  goalPos: Pos,
  _: GridWeights,
  gridBarriers: GridBarriers,
  genNeighbours: GenNeighboursImpl
): GridAnimationFrame[] {
  return genericUnidirectionalSearch(
    startPos,
    goalPos,
    new Stack<Pos>(),
    blankGridWeights,
    gridBarriers,
    genNeighbours,
    new ObjMap<Pos, number>([])
  );
}

// Implementation of Dijkstras by passing in a Priority Queue with the appropiate comparator to genericUnidirectionalSearch()
export function unidirectionalDijkstras(
  startPos: Pos,
  goalPos: Pos,
  gridWeights: GridWeights,
  gridBarriers: GridBarriers,
  genNeighbours: GenNeighboursImpl
): GridAnimationFrame[] {
  const distsMap = new ObjMap<Pos, number>([]);

  return genericUnidirectionalSearch(
    startPos,
    goalPos,
    new PriorityQueue<Pos>(genDijkstraCmp(distsMap)),
    gridWeights,
    gridBarriers,
    genNeighbours,
    distsMap
  );
}

// Implementation of A* by passing in a Priority Queue with the appropiate comparator to genericUnidirectionalSearch()
export function unidirectionalAstar(
  startPos: Pos,
  goalPos: Pos,
  gridWeights: GridWeights,
  gridBarriers: GridBarriers,
  genNeighbours: GenNeighboursImpl
): GridAnimationFrame[] {
  const distsMap = new ObjMap<Pos, number>([]);

  return genericUnidirectionalSearch(
    startPos,
    goalPos,
    new PriorityQueue<Pos>(genAstarCmp(distsMap, goalPos)),
    gridWeights,
    gridBarriers,
    genNeighbours,
    distsMap
  );
}

// Implementation of Greedy Best First Search by passing in a Priority Queue with the appropiate comparator to genericUnidirectionalSearch()
export function unidirectionalGBFS(
  startPos: Pos,
  goalPos: Pos,
  _: GridWeights,
  gridBarriers: GridBarriers,
  genNeighbours: GenNeighboursImpl
): GridAnimationFrame[] {
  const distsMap = new ObjMap<Pos, number>([]);

  return genericUnidirectionalSearch(
    startPos,
    goalPos,
    new PriorityQueue<Pos>(genManhattanCmp(goalPos)),
    blankGridWeights,
    gridBarriers,
    genNeighbours,
    distsMap
  );
}

// Implementation of Random Search by passing in a Priority Queue with the appropiate comparator to genericUnidirectionalSearch()
export function unidirectionalRandom(
  startPos: Pos,
  goalPos: Pos,
  _: GridWeights,
  gridBarriers: GridBarriers,
  genNeighbours: GenNeighboursImpl
): GridAnimationFrame[] {
  const distsMap = new ObjMap<Pos, number>([]);

  return genericUnidirectionalSearch(
    startPos,
    goalPos,
    new PriorityQueue<Pos>(genRandomCmp()),
    blankGridWeights,
    gridBarriers,
    genNeighbours,
    distsMap
  );
}
