import styles from "./styles.module.css";
function Separator() {
  return (
    <div
      style={{
        height: "1px",
        width: "100%",
        backgroundColor: "white",
        marginTop: "0.5rem",
      }}
    />
  );
}
function LinksToThisNote() {
  return (
    <div className={`${styles.flexItem}`}>
      <div>Links to this note</div>
      <Separator />
    </div>
  );
}

function LinksFromThisNote() {
  return (
    <div className={`${styles.flexItem}`}>
      <div>Links from this note</div>
      <Separator />
    </div>
  );
}
export function NoteInfoSidePanel() {
  return (
    <div className={`flex flex-col`}>
      <LinksToThisNote />
      <LinksFromThisNote />
    </div>
  );
}
