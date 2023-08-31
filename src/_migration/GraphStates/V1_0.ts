// for version 1.0
export interface GraphNode {
  id: string;
  title: string;
  content: string;
  labels: string[];
  dateCreated?: string;
  dateLastModified?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  undirected?: boolean;
}

export interface Version1_0 {
  version: string;
  nodes: GraphNode[];
  links: GraphLink[];
  deletedNodes: GraphNode[];
  deletedLinks: GraphLink[];
  labels: string[];
}
