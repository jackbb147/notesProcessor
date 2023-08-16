import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";

export function PasswordFormField() {
  const [type, setType] = useState<"password" | "text">("password");
  function toggleShowPassword() {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  }
  return (
    <Form.Field className="grid mb-[10px]" name="password">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
          Password
        </Form.Label>
        <Form.Message
          className="text-[13px] text-white opacity-[0.8]"
          match="valueMissing"
        >
          Please enter a password
        </Form.Message>
        <Form.Message
          className="text-[13px] text-white opacity-[0.8]"
          match="typeMismatch"
        >
          Please provide a valid password
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="box-border w-full bg-blackA5 shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
          type={type}
          required
        />
      </Form.Control>
      <div className={`flex items-center border-white mt-0.5`}>
        <input
          className={`w-4 h-4`}
          type={"checkbox"}
          onClick={toggleShowPassword}
        />{" "}
        Show Password
      </div>
    </Form.Field>
  );
}
