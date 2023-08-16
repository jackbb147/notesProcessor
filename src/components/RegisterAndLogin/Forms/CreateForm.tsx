// create the mapping
import { z } from "zod";
import { createTsForm, useTsController } from "@ts-react/form";

function TextField() {
  const { field, error } = useTsController<string>();
  return (
    <>
      <input
        value={field.value ? field.value : ""} // conditional to prevent "uncontrolled to controlled" react warning
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      />
      {error?.errorMessage && <span>{error?.errorMessage}</span>}
    </>
  );
}

const mapping = [
  [z.string(), TextField],
  // [z.boolean(), CheckBoxField],
  // [z.number(), NumberField],
] as const; // 👈 `as const` is necessary

// A typesafe React component
const MyForm = createTsForm(mapping);

const SignUpSchema = z.object({
  email: z.string().email("Enter a real email please."), // renders TextField
  username: z.string(),
  password: z.string(),
  // address: z.string(),
  // favoriteColor: z.enum(["blue", "red", "purple"]), // renders DropDownSelect and passed the enum values
  // isOver18: z.boolean(), // renders CheckBoxField
});

export function MySignUpForm() {
  function onSubmit(data: z.infer<typeof SignUpSchema>) {
    // gets typesafe data when form is submitted
  }

  return (
    <MyForm
      schema={SignUpSchema}
      onSubmit={onSubmit}
      renderAfter={() => <button type="submit">Submit</button>}
      // optional typesafe props forwarded to your components
      // props={{
      //   email: {
      //     className: "mt-2",
      //   },
      // }}
    />
  );
}
