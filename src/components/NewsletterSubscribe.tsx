import { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import validateEmail from "@utils/validateEmail";

const NewsletterSubscribe = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);
    const subToast = toast.loading("Submitting…");

    const formData = new FormData(e.currentTarget);
    const formInputs = Object.fromEntries(formData);

    const email = formInputs.email;

    // email exists
    if (!email) {
      return toast.error("Please provide an email address", {
        id: subToast,
      });
    }

    // validate email
    if (!validateEmail((email as string).trim())) {
      return toast.error("Please provide a valid email address", {
        id: subToast,
      });
    }

    try {
      const res = await fetch("/api/subscribe.json", {
        method: "POST",
        body: JSON.stringify(formInputs),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const successMessage = await res.json();

      toast.success(successMessage.message, {
        id: subToast,
      });

      setSubscribed(true);

      formRef.current?.reset();
      setIsSubmitting(false);
    } catch (e) {
      setIsSubmitting(false);

      toast.error("There was a problem subscribing you. Please try again.", {
        id: subToast,
      });
    }
  };

  return (
    <section className="pb-5 pt-10 lg:pb-16 lg:pt-32">
      <div className="container relative flex justify-center">
        {/* Teal blur */}
        <div className="absolute -right-6 -top-40 -z-10 hidden aspect-square w-96 rounded-full bg-primary-teal/40 blur-[80px] md:block"></div>

        {/* Purple blur */}
        <div className="absolute -left-2 -z-10 aspect-square w-72 rounded-full bg-accent-purple/40 blur-[80px] lg:-bottom-40"></div>

        {/* Form */}
        <div className="w-full max-w-[458px] rounded-lg bg-white px-8 py-9 shadow-lg">
          <h2 className="mb-6 text-center text-3xl font-semibold">
            Subscribe to my newsletter
          </h2>

          {subscribed && (
            <p className="text-center text-lg text-gray-700">
              Thank you for subscribing!
            </p>
          )}

          {!subscribed && (
            <form
              className="flex flex-col items-end gap-2.5 md:flex-row"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <input
                className="block h-10 w-full rounded-md bg-off-white px-2.5"
                type="email"
                name="email"
                id="email"
                placeholder="john@example.com"
                required
              />
              <button
                className="btn h-10 w-full px-8 md:w-auto"
                type="submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      <Toaster />
    </section>
  );
};
export default NewsletterSubscribe;
