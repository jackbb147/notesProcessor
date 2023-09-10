import * as Form from "@radix-ui/react-form";
import { PasswordFormField } from "../Forms/PasswordFormField";
import { InputComponent } from "../Forms/InputComponent";
import axios from "axios";
import { useEffect } from "react";

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
async function register(info: registrationInfo) {
  const endpoint = "http://localhost:5046/create";
  try {
    // const response = await axios.get("http://localhost:5046/getUsers");
    const response = await checkLogin();
    // const response = await axios.post(
    //   endpoint,
    //   {},
    //   {
    //     params: {
    //       Name: info.username,
    //       Email: info.email,
    //       Password: info.password,
    //     },
    //   },
    // );

    return response;
  } catch (e) {
    console.error(e);
  }
}

export function RegistrationForm() {
  async function handleSubmit(v: any) {
    //
    v.preventDefault();
    try {
      const email = v.target[0].value,
        username = v.target[1].value,
        password = v.target[2].value;
      var status = await register({ email, username, password });
      // var status = await checkLogin();
      //

      //
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <Form.Root onSubmit={handleSubmit} className="w-full">
      <EmailFormField />
      <UsernameFormField />
      <PasswordFormField />

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
