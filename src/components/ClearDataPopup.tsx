import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { useContext } from "react";
import {
  AppStateContext,
  AppStateDispatchContext,
} from "../reducers/AppStateContext";
import { AppActionType, Collections } from "../reducers/AppStateReducer";

import { useClearDataMutation } from "../api/apiSlice";
import {
  useAppDispatch,
  useAppState,
} from "../hooks/AppStateAndGraphAndUserhooks";
import { refreshPage } from "../hooks/Refreshpage";

export function ClearDataPopup() {
  const [
    clearData,
    {
      isLoading: clearDataIsLoading,
      isError: clearDataIsError,
      error: clearDataError,
    },
  ] = useClearDataMutation();
  const state = useAppState();
  const dispatch = useAppDispatch();

  // const [recoverNote] = useRecoverNoteMutation();
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    //   TODO
    // await clearData();
    clearData()
      .unwrap()
      .then((payload) => {
        console.log("fulfilled", payload);
        refreshPage();
      })
      .catch((error) => {
        console.error("rejected", error.data);
        alert("Failed to clear data. An unknown error occurred.");
        console.error("clearData error", clearDataError);
      });
  }
  return (
    <AlertDialog.Root
      open={state.showClearDataPopup}
      onOpenChange={(open: boolean) => {
        dispatch({ type: AppActionType.setShowClearDataPopup, show: false });
      }}
    >
      {/*<AlertDialog.Trigger asChild>*/}
      {/*    <button className="text-violet11 hover:bg-mauve3 shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black">*/}
      {/*        Delete account*/}
      {/*    </button>*/}
      {/*</AlertDialog.Trigger>*/}
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Are you sure?
          </AlertDialog.Title>
          <AlertDialog.Description className="text-mauve11 mt-4 mb-5 text-[15px] leading-normal">
            This will delete all your data(including all your notes). This
            action cannot be undone.
          </AlertDialog.Description>

          <div className="flex justify-end gap-[25px]">
            <AlertDialog.Cancel asChild>
              <button
                onClick={() => {
                  dispatch({
                    type: AppActionType.setShowClearDataPopup,
                    show: false,
                  });
                }}
                className="text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] w-fit"
              >
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <button
                onClick={handleClick}
                className="text-white bg-red-500 hover:bg-red-600 focus:shadow-green-600 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px] w-fit"
              >
                Clear All My Data
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
