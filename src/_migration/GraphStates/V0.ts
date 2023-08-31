export interface GraphNode {
  id: string;
  title: string;
  labels: string[];
  dateLastModified?: string;
  dateCreated?: string;
  content: string;
}

export interface V0 {
  nodes: GraphNode[];
  labels: string[];
  deletedNodes: GraphNode[];
}
