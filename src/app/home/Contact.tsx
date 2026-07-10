"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setIsSending(true);
    setStatus("idle");

    emailjs
      .sendForm(
        "service_w9c78ml",
        "template_es8b751",
        form.current,
        "osq-MtJqRaeUxC478"
      )
      .then(
        () => {
          setStatus("success");
          form.current?.reset();
        },
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("error");
        }
      )
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section className="mx-auto max-w-4xl py-24 px-4 sm:px-6 lg:px-8">
      <div className="glass-card overflow-hidden lg:grid lg:grid-cols-2">
        <div className="p-8 sm:p-12 bg-primary-600/90 backdrop-blur-md text-white flex flex-col justify-center">
          <h2 className="text-3xl font-extrabold tracking-tight mb-4">
            Get in touch
          </h2>
          <p className="text-primary-50 text-lg mb-8">
            Have questions or feedback about REdge? We'd love to hear from you. Our team typically responds within 24 hours.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="font-medium">vaibhavkumar955584@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <form ref={form} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label htmlFor="user_name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="user_name"
                id="user_name"
                required
                placeholder="John Doe"
                className="input-field border-white/20"
              />
            </div>
            <div>
              <label htmlFor="user_email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="user_email"
                id="user_email"
                required
                placeholder="vaibhav@example.com"
                className="input-field border-white/20"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Subject
              </label>
              <select
                name="subject"
                id="subject"
                className="input-field border-white/20"
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                required
                rows={4}
                placeholder="Tell us what's on your mind..."
                className="input-field border-white/20 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="btn-primary w-full py-4 text-base disabled:opacity-70"
            >
              {isSending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </button>

            {status === "success" && (
              <p className="text-center text-sm font-semibold text-green-600 animate-fade-in">
                Message sent successfully! We'll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm font-semibold text-red-600 animate-fade-in">
                Something went wrong. Please try again later.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
