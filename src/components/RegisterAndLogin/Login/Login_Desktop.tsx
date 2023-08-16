import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useAppState, useDispatch } from "../../../hooks/AppStateAndGraphhooks";
import { AppActionType } from "../../../reducers/AppStateReducer";
import { LoginForm } from "./LoginForm";
import React from "react";
import { ToRegister } from "../RegisterLoginRedirect/Redirect";

export function Login_Desktop() {
  const AppState = useAppState();
  const dispatch = useDispatch();

  const handleOpenChange = (openStatus: boolean) => {
    dispatch({
      type: AppActionType.setShowLoginPage,
      show: openStatus,
    });
  };

  return (
    <Dialog.Root open={AppState.showLoginPage} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className={`
                            data-[state=open]:animate-contentShow 
                            fixed 
                            top-[50%] 
                            left-[50%] 
                            max-h-[85vh] 
                            w-[90vw] 
                            max-w-[450px] 
                            translate-x-[-50%] translate-y-[-50%] 
                            rounded-[6px] 
                            bg-white
                            dark:bg-dark_secondary
                            dark:text-white
                            p-[25px] 
                            shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
                            focus:outline-none`}
        >
          <span className={"font-bold"}>Login</span>
          <LoginForm />
          <ToRegister />

          <Dialog.Close asChild>
            <button
              className=" text-black dark:text-white focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
