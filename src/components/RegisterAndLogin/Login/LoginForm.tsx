import * as Form from "@radix-ui/react-form";
import {PasswordFormField} from "../Forms/PasswordFormField";
import React from "react";
import {axiosCustomInstance} from "../../../api/AxiosCustomInstance";
import {useDispatch, useSetUser} from "../../../hooks/AppStateAndGraphAndUserhooks";
import {AppActionType} from "../../../reducers/AppStateReducer";
import axios from "axios";

function EmailFormField() {
  return (
    <Form.Field className="grid mb-[10px]" name="email">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
          Email
        </Form.Label>
        <Form.Message
          className="text-[13px] text-white opacity-[0.8]"
          match="valueMissing"
        >
          Please enter your email
        </Form.Message>
        <Form.Message
          className="text-[13px] text-white opacity-[0.8]"
          match="typeMismatch"
        >
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none  text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type="email"
          required
        />
      </Form.Control>
    </Form.Field>
  );
}

// function PasswordFormField() {
//   const [type, setType] = useState<"password" | "text">("password");
//   function toggleShowPassword() {
//     setType((prevType) => (prevType === "password" ? "text" : "password"));
//   }
//   return (
//     <Form.Field className="grid mb-[10px]" name="password">
//       <div className="flex items-baseline justify-between">
//         <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
//           Password
//         </Form.Label>
//         <Form.Message
//           className="text-[13px] text-white opacity-[0.8]"
//           match="valueMissing"
//         >
//           Please enter a password
//         </Form.Message>
//         <Form.Message
//           className="text-[13px] text-white opacity-[0.8]"
//           match="typeMismatch"
//         >
//           Please provide a valid password
//         </Form.Message>
//       </div>
//       <Form.Control asChild>
//         <input
//           className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
//           type={type}
//           required
//         />
//       </Form.Control>
//       <div className={`flex items-center border-white mt-0.5`}>
//         <input
//           className={`w-4 h-4`}
//           type={"checkbox"}
//           onClick={toggleShowPassword}
//         />{" "}
//         Show Password
//       </div>
//     </Form.Field>
//   );
// }

function UsernameFormField() {
  return (
    <Form.Field className="grid mb-[10px]" name="username">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
          Username
        </Form.Label>
        <Form.Message
          className="text-[13px] text-white opacity-[0.8]"
          match="valueMissing"
        >
          Please enter a username
        </Form.Message>
        {/*<Form.Message className="text-[13px] text-white opacity-[0.8]" match="typeMismatch">*/}
        {/*    Please provide a valid password*/}
        {/*</Form.Message>*/}
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type={"text"}
          required
        />
      </Form.Control>
    </Form.Field>
  );
}


interface loginInfo {
    email: string;
    password: string;
}
export function LoginForm() {

    const dispatch = useDispatch()
    const setUser = useSetUser();
    async function login(info: loginInfo) {
        // const endpoint = "http://localhost:5046/isLoggedIn";
        const endpoint = "http://localhost:5046/Authenticate/Login";
        const shortEndpoint  = "/Authenticate/Login";
        // const endpoint = "http://name5-dev.eba-zcpkbqup.us-west-2.elasticbeanstalk.com/isLoggedIn";
        const response = await axiosCustomInstance.post(
            shortEndpoint,null,
            {
                withCredentials: true,
                params: {
                    Email: info.email,
                    Password: info.password,
                }
            }
        );


        return response;
    }
  const handleSubmit = async (event: any) => {

        // debugger;
        event.preventDefault();
        try {
            const response = await login({
                email: event.target[0].value,
                password: event.target[1].value,
            });
            if(response?.status === 200){
                setUser(response.data);
                dispatch({
                    type: AppActionType.setShowLoginPage,
                    show: false
                })
            } else if(response?.status === 400){
                alert(`Login failed: ${response.data}}`)
            }
        }catch (e: any) {
            const resp = e.response;
            if(resp?.status === 400){
                alert(resp.data);
            }else{
                alert(`Login failed: ${e}`)
            }


            console.dir(e);
        }



      // debugger; //TODO

  };
  return (
    <Form.Root onSubmit={handleSubmit} className="w-full">
      <EmailFormField />
      <PasswordFormField />
      <Form.Submit asChild>
        <button
          className={`bg-button box-border w-full text-white shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px]  px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]`}
        >
          LOGIN
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
