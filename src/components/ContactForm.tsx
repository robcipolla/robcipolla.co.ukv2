import { useForm, ValidationError } from "@formspree/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ContactForm({ formId }: { formId: string }) {
  const [state, handleSubmit] = useForm(formId);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully, I will get back to you soon!");
      setSent(true);
    }

    if (state.errors) {
      toast.error("Something went wrong, please try again later");
      setSent(false);
    }
  }, [state.succeeded, state.errors]);

  return (
    <>
      {sent && (
        <p className="text-green-500">
          Message sent successfully, I will get back to you soon!
        </p>
      )}
      {!sent && (
        <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-xs italic text-red-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-xs italic text-red-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-xs italic text-red-500"
            />
          </div>

          <small>
            By submitting this form you are agreeing that your details will be
            used only for the purpose of your enquiry.
          </small>

          <button
            className="btn self-start"
            type="submit"
            disabled={state.submitting}
          >
            Send message
          </button>
        </form>
      )}
      <Toaster />
    </>
  );
}

export default ContactForm;
