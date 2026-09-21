"use client";

import { useId, useRef, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   Enquiry form.

   Modelled on the reference site's closing lead-capture band, and
   deliberately better than it in five specific ways. Each one is a
   real defect in theirs, not a matter of taste:

   1. REAL LABELS. Theirs are placeholders — "First Name*" vanishes
      the moment you type, so anyone who tabs back cannot tell which
      field they are in, and it fails WCAG 3.3.2 outright. Here every
      field has a <label> that floats to the top of the control
      instead of disappearing.

   2. THREE REQUIRED FIELDS, NOT SEVEN. Theirs demands first name,
      last name, email, company, job title, country and a message
      before it will take an enquiry. Every required field costs
      completions. Name, work email and "what do you need" are all
      that is needed to reply to someone; company is offered and
      optional, and job title and country are questions for the
      first conversation, not the doorway to it.

   3. ERRORS THAT SAY WHAT TO DO. Validation runs on blur once a
      field has been touched, each message is tied to its input with
      aria-describedby, aria-invalid marks the control, and a
      role="alert" summary announces the count so a screen-reader
      user is not hunting.

   4. A REAL FAILURE PATH. If the request fails, the form says so
      and hands over a mailto: with the message pre-filled, so an
      enquiry is never silently lost. The reference's form gives no
      indication of what happens when its endpoint is down.

   5. NO CAPTCHA. A honeypot field catches bots without making a
      customer prove they are human.

   The success copy promises nothing I cannot verify — no response
   time, no named person. Edit it if you have an SLA you want to
   commit to; do not let me invent one.
   ══════════════════════════════════════════════════════════════ */

/* Set this to your privacy policy URL and the consent line becomes a
   link. Left null deliberately: there is no /privacy route in this
   project yet, and a consent checkbox pointing at a 404 is worse
   than one without a link. */
const PRIVACY_HREF: string | null = null;

type Field = "name" | "email" | "company" | "message" | "consent";

const LIMITS: Record<string, number> = {
  name: 120,
  email: 200,
  company: 160,
  message: 2000,
};

function validate(values: Record<string, string>, consent: boolean) {
  const errors: Partial<Record<Field, string>> = {};

  if (!values.name.trim()) errors.name = "Please tell us your name.";

  const email = values.email.trim();
  if (!email) {
    errors.email = "We need an address to reply to.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "That does not look like an email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Tell us what you are trying to solve.";
  } else if (values.message.trim().length < 12) {
    errors.message = "A sentence or two helps us route this to the right person.";
  }

  if (!consent) errors.consent = "We need your permission before we can reply.";

  return errors;
}

export default function EnquiryForm() {
  const uid = useId();
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  /* Bots fill every field they can see, including ones positioned off
     screen. A human never touches this, so anything in it is spam —
     and it costs a customer nothing, unlike a CAPTCHA. */
  const honeypot = useRef<HTMLInputElement>(null);

  const set = (k: "name" | "email" | "company" | "message") => (v: string) => {
    const clipped = v.slice(0, LIMITS[k]);
    setValues((prev) => ({ ...prev, [k]: clipped }));
    // Re-validate as they type, but only once they have left the
    // field at least once — validating a half-typed email the first
    // time through is nagging, not helping.
    if (touched[k]) setErrors(validate({ ...values, [k]: clipped }, consent));
  };

  const blur = (k: Field) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values, consent));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot.current?.value) return; // silently drop

    const found = validate(values, consent);
    setErrors(found);
    setTouched({ name: true, email: true, company: true, message: true, consent: true });

    if (Object.keys(found).length) {
      // Move focus to the first problem rather than leaving the
      // reader to find it.
      document.getElementById(`${uid}-${Object.keys(found)[0]}`)?.focus();
      return;
    }

    setState("sending");
    try {
      /* Posts to the lead endpoint that already exists, in the shape
         it already expects — no new backend, no new credentials, and
         the enquiry lands in the same sheet and inbox as every other
         lead. `interest` is that route's free-text field. */
      const res = await fetch("/api/contact/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          interest: values.message.trim(),
          businessType: values.company.trim() || "Not given",
          page: typeof window === "undefined" ? "/" : window.location.pathname,
          timestamp: new Date().toISOString(),
        }),
      });
      // The route answers 200 with {success:false} on a handled
      // failure, so checking res.ok alone would report a send that
      // never happened.
      const body = await res.json().catch(() => ({}));
      setState(res.ok && body?.success !== false ? "sent" : "failed");
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <div
        className="rounded-[24px] border-2 p-8 md:p-10"
        style={{ borderColor: "var(--color-line-lit)" }}
        role="status"
      >
        <p className="font-mono-label text-[color:var(--color-champagne)]">
          Enquiry received
        </p>
        <h3 className="font-display mt-5 text-[length:var(--text-h3)] font-semibold">
          Thank you — that has reached us.
        </h3>
        <p className="mt-4 leading-relaxed text-mute">
          We will reply to <span className="text-text">{values.email.trim()}</span>.
          If it is urgent, the concierge at the bottom right of this page can
          answer straight away.
        </p>
      </div>
    );
  }

  const errorCount = Object.keys(errors).filter((k) => touched[k as Field]).length;

  return (
    <form
      onSubmit={submit}
      noValidate
      /* A real submit target. With JavaScript running, `submit`
         calls preventDefault and posts JSON, and this is never used.
         It exists for the audit's "Forms have a submit target"
         check, and because a form with no action has nowhere to go
         at all if the script bundle fails to load. It is same-origin,
         so it also passes the CSP's form-action 'self'. */
      action="/api/contact/lead"
      method="post"
      className="flex flex-col gap-4"
    >
      {/* Announced, not shown — the visible errors sit on the fields. */}
      <p role="alert" aria-live="polite" className="sr-only">
        {errorCount > 0
          ? `${errorCount} field${errorCount > 1 ? "s" : ""} need attention.`
          : ""}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Text
          id={`${uid}-name`}
          label="Your name"
          required
          value={values.name}
          onChange={set("name")}
          onBlur={blur("name")}
          error={touched.name ? errors.name : undefined}
          autoComplete="name"
        />
        <Text
          id={`${uid}-email`}
          label="Work email"
          required
          type="email"
          value={values.email}
          onChange={set("email")}
          onBlur={blur("email")}
          error={touched.email ? errors.email : undefined}
          autoComplete="email"
        />
      </div>

      <Text
        id={`${uid}-company`}
        label="Company"
        hint="Optional"
        value={values.company}
        onChange={set("company")}
        onBlur={blur("company")}
        autoComplete="organization"
      />

      <Text
        id={`${uid}-message`}
        label="What are you trying to solve?"
        required
        multiline
        value={values.message}
        onChange={set("message")}
        onBlur={blur("message")}
        error={touched.message ? errors.message : undefined}
        counter={`${values.message.length}/${LIMITS.message}`}
      />

      {/* Honeypot. Off-screen rather than display:none — some bots
          skip hidden fields but not positioned ones. */}
      <input
        ref={honeypot}
        type="text"
        name="website"
        aria-label="Leave this field empty"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <div className="mt-1">
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-mute">
          <input
            id={`${uid}-consent`}
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (touched.consent) setErrors(validate(values, e.target.checked));
            }}
            onBlur={blur("consent")}
            aria-invalid={touched.consent && !!errors.consent}
            aria-describedby={
              touched.consent && errors.consent ? `${uid}-consent-err` : undefined
            }
            className="mt-1 h-[18px] w-[18px] shrink-0 cursor-pointer accent-[color:var(--color-champagne)]"
          />
          <span>
            I agree to Nexxovate storing these details in order to respond to my
            enquiry.
            {PRIVACY_HREF && (
              <>
                {" "}
                <a href={PRIVACY_HREF} className="text-text underline underline-offset-4">
                  Privacy policy
                </a>
                .
              </>
            )}
          </span>
        </label>
        {touched.consent && errors.consent && (
          <p id={`${uid}-consent-err`} className="mt-2 pl-8 text-[13px] text-crit">
            {errors.consent}
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-[15px] font-semibold transition-[filter] duration-300 hover:brightness-110 disabled:cursor-progress disabled:opacity-70"
          style={{ background: "var(--btn-bg)", color: "var(--btn-fg)" }}
        >
          {state === "sending" ? "Sending…" : "Send enquiry"}
          {state !== "sending" && <span aria-hidden="true">→</span>}
        </button>

        <p className="text-[13px] text-faint">
          Three fields. No newsletter sign-up.
        </p>
      </div>

      {state === "failed" && (
        <div
          role="alert"
          className="mt-2 rounded-[16px] border p-5 text-[14px] leading-relaxed"
          style={{ borderColor: "var(--color-crit)" }}
        >
          <p className="text-text">That did not send.</p>
          <p className="mt-2 text-mute">
            Rather than lose what you wrote —{" "}
            <a
              className="text-text underline underline-offset-4"
              href={`mailto:info@nexxovate.com?subject=${encodeURIComponent(
                "Enquiry from nexxovate.com"
              )}&body=${encodeURIComponent(
                `${values.message}\n\n— ${values.name}${
                  values.company ? `, ${values.company}` : ""
                }\n${values.email}`
              )}`}
            >
              send it as an email instead
            </a>
            , or try again in a moment.
          </p>
        </div>
      )}
    </form>
  );
}

/* ── Field ──────────────────────────────────────────────────────
   One control, one floating label. The label is a real <label>
   bound by htmlFor — it moves out of the way rather than being
   replaced by the value, which is the whole failure of the
   placeholder-as-label pattern.

   `placeholder=" "` is load-bearing: :placeholder-shown is what
   tells CSS whether the field is empty, so the label can float
   without any JavaScript.
   ────────────────────────────────────────────────────────────── */

function Text({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  hint,
  counter,
  required = false,
  multiline = false,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string;
  hint?: string;
  counter?: string;
  required?: boolean;
  multiline?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  const shared = {
    id,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onBlur,
    placeholder: " ",
    required,
    autoComplete,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-err` : hint ? `${id}-hint` : undefined,
    className: [
      "peer w-full border-2 bg-transparent px-6 text-[15px] text-text outline-none transition-colors",
      multiline
        ? "min-h-[150px] resize-y rounded-[22px] pb-4 pt-8"
        : "rounded-full pb-2.5 pt-7",
      "focus:border-[color:var(--color-champagne)]",
    ].join(" "),
    style: { borderColor: error ? "var(--color-crit)" : "var(--color-line-lit)" },
  };

  return (
    <div className="relative">
      {multiline ? <textarea {...shared} /> : <input type={type} {...shared} />}

      <label
        htmlFor={id}
        className={[
          "pointer-events-none absolute left-6 origin-left text-mute transition-all duration-200",
          multiline ? "top-5" : "top-1/2 -translate-y-1/2",
          "peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-[11.5px] peer-focus:tracking-[0.08em] peer-focus:text-[color:var(--color-champagne)]",
          "peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-[11.5px] peer-[:not(:placeholder-shown)]:tracking-[0.08em]",
          multiline
            ? "peer-focus:top-3 peer-[:not(:placeholder-shown)]:top-3"
            : "",
        ].join(" ")}
      >
        {label}
        {required && (
          <span aria-hidden="true" className="text-[color:var(--color-champagne)]">
            {" "}
            *
          </span>
        )}
      </label>

      {error ? (
        <p id={`${id}-err`} className="mt-2 pl-6 text-[13px] text-crit">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 pl-6 text-[13px] text-faint">
          {hint}
        </p>
      ) : null}

      {counter && (
        <span className="mt-2 block pr-2 text-right text-[12px] tabular-nums text-faint">
          {counter}
        </span>
      )}
    </div>
  );
}
