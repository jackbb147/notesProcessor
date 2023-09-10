import { ReferenceMap } from "./ReferenceStateReducer";

export function countReferences(
  contentJSON: Record<string, any>,
): ReferenceMap {
  var res = new Map();
  function visit(root: Record<string, any>) {
    if (!root) return;
    //
    if (root.type === "mention") {
      //
      const note = JSON.parse(root.attrs.id);
      const id = note.Id;
      //
      if (res.has(id)) {
        res.set(id, res.get(id) + 1);
      } else {
        res.set(id, 1);
      }
    }

    root.content?.forEach((child: Record<string, any>) => visit(child));
  }

  visit(contentJSON);
  //

  return res;
}
