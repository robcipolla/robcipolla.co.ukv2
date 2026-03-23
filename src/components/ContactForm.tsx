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
        <div className="rounded-lg border border-ember/20 bg-ember/5 p-6">
          <p className="font-serif text-lg text-ink">Message sent</p>
          <p className="mt-1 text-[14px] text-dusk">
            Thanks for reaching out — I'll get back to you soon.
          </p>
        </div>
      )}
      {!sent && (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="font-mono text-[11px] uppercase tracking-wide text-dusk">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="block w-full rounded border border-rule bg-chalk px-4 py-2.5 text-[14px] text-ink shadow-none transition-colors focus:border-ember focus:ring-1 focus:ring-ember focus:outline-none"
            />
            <ValidationError
              prefix="Name"
              field="name"
              errors={state.errors}
              className="text-xs text-ember"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-mono text-[11px] uppercase tracking-wide text-dusk"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="block w-full rounded border border-rule bg-chalk px-4 py-2.5 text-[14px] text-ink shadow-none transition-colors focus:border-ember focus:ring-1 focus:ring-ember focus:outline-none"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
              className="text-xs text-ember"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="message"
              className="font-mono text-[11px] uppercase tracking-wide text-dusk"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="block w-full rounded border border-rule bg-chalk px-4 py-2.5 text-[14px] text-ink shadow-none transition-colors focus:border-ember focus:ring-1 focus:ring-ember focus:outline-none"
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
              className="text-xs text-ember"
            />
          </div>

          <p className="font-mono text-[10px] text-dusk">
            By submitting this form you agree your details will be used only for the purpose of your enquiry.
          </p>

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
