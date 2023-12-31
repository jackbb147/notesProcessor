import * as Form from "@radix-ui/react-form";
import { PasswordFormField } from "../Forms/PasswordFormField";
import { InputComponent } from "../Forms/InputComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../api/apiSlice";
import { refreshPage } from "../../../hooks/Refreshpage";

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
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type="email"
          required
        />
      </Form.Control>
    </Form.Field>
  );
}

// function PasswordFormField() {
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
//           type={"password"}
//           required
//         />
//       </Form.Control>
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

interface registrationInfo {
  email: string;
  username: string;
  password: string;
}

async function checkLogin() {
  // const endpoint = "http://localhost:5046/dog";
  try {
    const response = await axios.get("http://localhost:5046/dog", {
      withCredentials: true,
    });
    // const response = await axios.get("http://localhost:5046/getUsers");
    // const response = await axios.get(
    //     endpoint,
    //     {},
    // );
  } catch (e) {
    console.error(e);
  }
}
// useEffect(() => {
//   // const endpoint = "http://localhost:5046/isLoggedIn";
//
// }, [])

export function RegistrationForm() {
  const [register, { data, error, isLoading }] = useRegisterMutation();
  const [errorDescriptions, setErrorDescriptions] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  async function handleSubmit(v: any) {
    //
    v.preventDefault();
    try {
      const email = v.target[0].value,
        username = v.target[1].value,
        password = v.target[2].value;
      register({
        Email: email,
        UserName: username,
        Password: password,
      })
        .unwrap()
        .then((payload) => {
          console.log("fulfilled", payload);
          // TODO let the user know they've successfully registered
          setErrorDescriptions([]);
          setMessage(
            "Registration successful! Sending you to the login page now. ",
          );
          setTimeout(() => {
            refreshPage();
          }, 2500);
          // debugger;
        })
        .catch((error) => {
          console.error("rejected", error.data);
          setErrorDescriptions(
            error.data.map(
              (o: { Code: string; Description: string }) => o.Description,
            ),
          );
        });
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Form.Root onSubmit={handleSubmit} className="w-full">
      <EmailFormField />
      <UsernameFormField />
      <PasswordFormField />
      {errorDescriptions.map((str) => (
        <div className="text-red-500">{str}</div>
      ))}
      {message.length > 0 && <div className="text-green-500">{message}</div>}

      <Form.Submit asChild>
        <button
          className={`bg-button box-border w-full text-white shadow-blackA7 inline-flex h-[35px] items-center justify-center rounded-[4px]  px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]`}
        >
          CREATE ACCOUNT
        </button>
      </Form.Submit>
    </Form.Root>
  );
}
