import { GraphNode } from "../../../reducers/GraphReducer";
import { useAppDispatch } from "../../../hooks/AppStateAndGraphAndUserhooks";
import { AppActionType, Collections } from "../../../reducers/AppStateReducer";
import { ListItem } from "../../Buttons/ListItem";

export function NoteItem({
  note,
  deletable = false,
  onDelete,
}: {
  note: GraphNode;
  deletable?: boolean;
  onDelete?: () => void;
}) {
  const dispatch = useAppDispatch();
  function onClick() {
    dispatch({
      type: AppActionType.setActiveNodeID,
      id: note.Id,
    });
    dispatch({
      type: AppActionType.setActiveCollection,
      activeCollection: Collections.All,
    });
  }

  return (
    <div
      className={`
    flex
    flex-row
    justify-between
    items-center
    w-full
   
    `}
    >
      <ListItem
        onClick={onClick}
        key={note.Id}
        text={note.Title}
        icon={<span className="material-symbols-outlined">article</span>}
        style={{
          opacity: 0.7,
          padding: "0",
          cursor: "pointer",
        }}
      />
      {deletable && onDelete && (
        <div
          className={`
        cursor-pointer
        hover:text-red9
        ml-1.5
        h-full
        flex
        items-center
       
        justify-end
        `}
          onClick={onDelete}
        >
          <span
            style={{
              fontSize: "1.2rem",
            }}
            className="material-symbols-outlined"
          >
            close
          </span>
        </div>
      )}
    </div>
  );
}
