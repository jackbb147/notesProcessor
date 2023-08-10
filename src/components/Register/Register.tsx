import {Desktop, Tablet, Mobile} from "../../hooks/useMediaQuery";
import {Register_Desktop} from "./Register_Desktop";
import {Register_Tablet} from "./Register_Tablet";
import {Register_Mobile} from "./Register_Mobile";

export function Register()
{
    return (
        <>
            <Desktop>
                <Register_Desktop/>
            </Desktop>

            <Tablet>
                <Register_Tablet/>
            </Tablet>

            <Mobile>
                <Register_Mobile/>
            </Mobile>
        </>
    )
}