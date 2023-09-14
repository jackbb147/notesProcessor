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
  Id: z.string(),
  Title: z.string(),
  Content: z.string(),
  DateCreated: z.string().optional(),
  DateLastModified: z.string().optional(),
  Deleted: z.boolean().optional(),
  DeletionDate: z.string().optional(),
});

export type GraphNode = z.infer<typeof GraphNode>;

const GraphLink = z.object({
  Id: z.string(),
  SourceId: z.string(),
  TargetId: z.string(),
  Deleted: z.boolean().optional(),
  DeletionDate: z.string().optional(),
  undirected: z.boolean().optional(),
});
export type GraphLink = z.infer<typeof GraphLink>;

export const Version1_1 = z.object({
  version: z.string(),
  nodes: z.array(GraphNode),
  links: z.array(GraphLink),
  deletedNodes: z.array(GraphNode),
  deletedLinks: z.array(GraphLink),
  labels: z.array(z.string()),
});

export type Version1_1 = z.infer<typeof Version1_1>;
