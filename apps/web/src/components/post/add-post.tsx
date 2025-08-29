import { useForm } from "./useAddPostForm";

export const AddPostForm = () => {
  const { form } = useForm();

  return (
    <div className="px-2 py-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <form.AppField
          name="title"
          children={(field) => <field.TextField label="title" />}
        />

        <form.AppField
          name="description"
          children={(field) => <field.TextField label="description" />}
        />

        <form.AppForm>
          <form.SubmitButton>Save</form.SubmitButton>
        </form.AppForm>
      </form>
    </div>
  );
};
