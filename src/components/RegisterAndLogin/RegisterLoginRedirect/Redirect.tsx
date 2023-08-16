import { useAppState, useDispatch } from "../../../hooks/AppStateAndGraphhooks";
import React from "react";
import { AppActionType } from "../../../reducers/AppStateReducer";

function ToLoginBtn() {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent) => {
    //     TODO
    dispatch({
      type: AppActionType.setShowRegisterPage,
      show: false,
    });

    dispatch({
      type: AppActionType.setShowLoginPage,
      show: true,
    });
  };
  return (
    <span
      className={`
                            text-button
                            cursor-pointer
                            `}
      onClick={handleClick}
    >
      {" "}
      Log in
    </span>
  );
}

function ToRegisterBtn() {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent) => {
    //     TODO
    dispatch({
      type: AppActionType.setShowLoginPage,
      show: false,
    });

    dispatch({
      type: AppActionType.setShowRegisterPage,
      show: true,
    });
  };

  return (
    <span
      className={`
                            text-button
                            cursor-pointer
                            
                            `}
      onClick={handleClick}
    >
      {" "}
      create an account
    </span>
  );
}

export function ToLogin() {
  return (
    <div className={"text-center mt-10 font-bold"}>
      Already have an account?
      <ToLoginBtn />
    </div>
  );
}

export function ToRegister() {
  return (
    <div className={"text-center mt-10 font-bold"}>
      Looking to
      <ToRegisterBtn /> ?
    </div>
  );
}
