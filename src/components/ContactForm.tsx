import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label>Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required:{value: true, message: "Name is required"} })}
          ></input>
          <p className="error">{errors.name?.message}</p>
        </div>

        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required:{value: true, message: "Email is required"},
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                return fieldValue !== "admin@gmail.com" || "Enter a different email address"
              },
              notBlackListed: (fieldValue) =>
              {
                return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
              }

              }
              
            })}
          ></input>
          <p className="error">{errors.email?.message}</p>
        </div>

        <div className="form-control">
          <label>Message</label>
          <textarea
            id="message"
            rows={5}
            {...register("message", { required:{value: true, message: "Message is required"}})}
          ></textarea>
          <p className="error">{errors.message?.message}</p>
        </div>

        <button type="submit">Submit</button>
        {isSubmitted && (
          <p className="success">Thank you! Your message has been submitted successfully.</p>
        )}
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default ContactForm;
