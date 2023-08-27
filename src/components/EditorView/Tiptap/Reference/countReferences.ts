export function countReferences(
  contentJSON: Record<string, any>,
): Map<string, number> {
  // debugger;

  var res = new Map();
  function visit(root: Record<string, any>) {
    if (!root) return;
    // debugger;
    if (root.type === "mention") {
      // debugger;
      const note = JSON.parse(root.attrs.id);
      const id = note.id;
      // debugger;
      if (res.has(id)) {
        res.set(id, res.get(id) + 1);
      } else {
        res.set(id, 1);
      }
    }

    root.content?.forEach((child: Record<string, any>) => visit(child));
  }

  visit(contentJSON);
  // debugger;

  return res;
}
