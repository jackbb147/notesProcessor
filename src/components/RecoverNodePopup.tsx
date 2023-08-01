
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import {useContext} from "react";
import {AppStateContext, AppStateDispatchContext} from "./AppStateContext";
import {AppActionType} from "../reducers/AppStateReducer";
import {GraphActionType} from "../reducers/GraphReducer";
import {GraphContext, GraphDispatchContext} from "./GraphContext";


export function RecoverNodePopup()
{

    const state = useContext(AppStateContext);
    const dispatch = useContext(AppStateDispatchContext);
    if(state===null || dispatch === null) throw Error("state or dispatch is null. ");
    const graph = useContext(GraphContext);
    const graphDispatch = useContext(GraphDispatchContext);
    if(graph===null || graphDispatch === null) throw Error("graph or graphDispatch is null. ");

    return <AlertDialog.Root open={state.showRecoverNodePopup} onOpenChange={(open:boolean)=>{
        dispatch({type: AppActionType.setShowRecoverNodePopup, show: false})
    }}>
        {/*<AlertDialog.Trigger asChild>*/}
        {/*    <button className="text-violet11 hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">*/}
        {/*        Delete account*/}
        {/*    </button>*/}
        {/*</AlertDialog.Trigger>*/}
        <AlertDialog.Portal>
            <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
            <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Recently deleted notes can’t be edited.
                </AlertDialog.Title>
                <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
                    To edit this note, you’ll need to recover it.
                </AlertDialog.Description>


                <div className="flex justify-end gap-[25px]">
                    <AlertDialog.Cancel asChild>
                        <button
                            onClick={()=>{
                                dispatch({type: AppActionType.setShowRecoverNodePopup, show: false})
                            }}
                            className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] w-fit">
                            Cancel
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action asChild>
                        <button
                            onClick={(event)=>{
                                event.preventDefault();
                                dispatch({type: AppActionType.setShowRecoverNodePopup, show: false})
                                if(!state.activeNodeID) throw Error("No active node id.");
                                graphDispatch(({type: GraphActionType.recoverNode, id: state.activeNodeID}))
                                dispatch({type: AppActionType.setActiveNodeID, id: undefined})
                            }}
                            className="text-white bg-green-500 hover:bg-green-600 focus:shadow-green-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] w-fit">
                            Recover
                        </button>
                    </AlertDialog.Action>
                </div>



            </AlertDialog.Content>
        </AlertDialog.Portal>
    </AlertDialog.Root>
}