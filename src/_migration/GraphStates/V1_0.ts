import { z } from "zod";
// for version 1.0
// export interface GraphNode {
//   id: string;
//   title: string;
//   content: string;
//   labels: string[];
//   dateCreated?: string;
//   dateLastModified?: string;
// }

export const GraphNode = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  labels: z.array(z.string()),
  dateCreated: z.string().optional(),
  dateLastModified: z.string().optional(),
});

export type GraphNode = z.infer<typeof GraphNode>;

// export interface GraphLink {
//   source: string;
//   target: string;
//   undirected?: boolean;
// }

export const GraphLink = z.object({
  source: z.string(),
  target: z.string(),
  undirected: z.boolean().optional(),
});

export type GraphLink = z.infer<typeof GraphLink>;

// export interface Version1_0 {
//   version: string;
//   nodes: GraphNode[];
//   links: GraphLink[];
//   deletedNodes: GraphNode[];
//   deletedLinks: GraphLink[];
//   labels: string[];
// }

export const Version1_0 = z.object({
  version: z.string(),
  nodes: z.array(GraphNode),
  links: z.array(GraphLink),
  deletedNodes: z.array(GraphNode),
  deletedLinks: z.array(GraphLink),
  labels: z.array(z.string()),
});

export type Version1_0 = z.infer<typeof Version1_0>;
