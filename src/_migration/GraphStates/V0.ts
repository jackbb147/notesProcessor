import { z } from "zod";
// export interface GraphNode {
//   id: string;
//   title: string;
//   labels: string[];
//   dateLastModified?: string;
//   dateCreated?: string;
//   content: string;
// }

export const GraphNode = z.object({
  id: z.string(),
  title: z.string(),
  labels: z.array(z.string()),
  dateLastModified: z.string().optional(),
  dateCreated: z.string().optional(),
  content: z.string(),
});

export type GraphNode = z.infer<typeof GraphNode>;

// export interface V0 {
//   nodes: GraphNode[];
//   labels: string[];
//   deletedNodes: GraphNode[];
// }

export const V0 = z.object({
  nodes: z.array(GraphNode),
  labels: z.array(z.string()),
  deletedNodes: z.array(GraphNode),
});

export type V0 = z.infer<typeof V0>;
