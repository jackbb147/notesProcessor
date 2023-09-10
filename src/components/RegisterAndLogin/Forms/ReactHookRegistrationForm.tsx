import React from "react";
import { useForm } from "react-hook-form";

export function ReactHookRegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    //
  };
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Email"
        {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      <input type="text" placeholder="Username" {...register("Username", {})} />
      <input
        type="password"
        placeholder="Password"
        {...register("Password", {})}
      />

      <input type="submit" />
    </form>
  );
}
