import {Desktop, Tablet, Mobile} from "../../../hooks/useMediaQuery";
import {Login_Desktop} from "./Login_Desktop";

export function Login()
{
    return (
        <>
            <Desktop>
                <Login_Desktop/>
            </Desktop>

            <Tablet>

            </Tablet>

            <Mobile>

            </Mobile>
        </>
    )
}