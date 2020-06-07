export function algorithm(grid,startNode,endNode,algorithm,
    heuristic,heuristicStrength,diagonal) {
        switch(algorithm) {
            case "dfs":
                break;
            case "bfs":
                break;
            case "greedy":
                return astar(grid,startNode,endNode,
                    false,heuristic,heuristicStrength,diagonal)
            case "dijkstra":
                return astar(grid,startNode,endNode,
                    true,null,heuristicStrength,diagonal)
            case "astar":
                return astar(grid,startNode,endNode,
                    true,heuristic,heuristicStrength,diagonal)
            default:
                return
        }
    }

function astar (grid, startNode, endNode, distance,
    heuristic, heuristicStrength, diagonal) {
    let nodesInOrder = [];
    startNode.distance = 0;
    let unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      let closestNode = unvisitedNodes.shift();
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) return nodesInOrder;
      closestNode.isVisited = true;
      nodesInOrder.push(closestNode);
      if (closestNode === endNode) return nodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid, endNode,
        distance, heuristic, heuristicStrength, diagonal);
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }
  
  function getHeuristic(heuristic,node,endNode) {
      switch (heuristic) {
            case "euclidean":
                return Math.sqrt(Math.pow((node.col - endNode.col),2) + Math.pow((node.row - endNode.row),2))
            case "manhattan":
                return Math.abs(node.col - endNode.col) + Math.abs(node.row - endNode.row)
            case "diagonal":
                return Math.max(Math.abs(node.col - endNode.col),Math.abs(node.row - endNode.row))
            default:
                return
      }
  }

  function updateUnvisitedNeighbors(node, grid, endNode, distance, heuristic, heuristicStrength, diagonal) {
    let unvisitedNeighbors = getUnvisitedNeighbors(node, grid, diagonal);
    for (let neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance
        if (distance) {
            neighbor.distance += neighbor.weight;
        }
        if (heuristic) {
            neighbor.distance += getHeuristic(heuristic,neighbor,endNode)*heuristicStrength
        }
      neighbor.previousNode = node;
    }
  }
  
  function getUnvisitedNeighbors(node, grid, diagonal) {
    let neighbors = [];
    let {row, col} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    if (diagonal) {
        if ((row > 0) && (col > 0)) neighbors.push(grid[row-1][col-1]);
        if ((row > 0) && (col < grid[0].length - 1)) neighbors.push(grid[row-1][col + 1]);
        if ((row < grid.length - 1) && (col > 0)) neighbors.push(grid[row+1][col-1]);
        if ((row < grid.length - 1) && (col < grid[0].length - 1)) neighbors.push(grid[row+1][col+1]);
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    let nodes = [];
    for (let row of grid) {
      for (let node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  export function getNodesInShortestPathOrder(endNode) {
    let nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }