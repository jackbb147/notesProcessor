import { Desktop, Tablet, Mobile } from "../../../hooks/useMediaQuery";
import { Login_Desktop } from "./Login_Desktop";
import { AppActionType } from "../../../reducers/AppStateReducer";
import { useLogInStatus } from "../../../hooks/useLogInStatus";
import {
  useDispatch,
  useAppState,
} from "../../../hooks/AppStateAndGraphAndUserhooks";

export function Login() {
  const AppState = useAppState();
  const dispatch = useDispatch();
  const [isLoggedIn, loggedInUserName] = useLogInStatus();
  if (!isLoggedIn)
    dispatch({ type: AppActionType.setShowLoginPage, show: true });
  return (
    <>
      <Desktop>
        <Login_Desktop />
      </Desktop>

      <Tablet>
        <Login_Desktop />
      </Tablet>

      <Mobile>
        <Login_Desktop />
      </Mobile>
    </>
  );
}
