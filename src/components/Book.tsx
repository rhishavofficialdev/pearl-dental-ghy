import { useState, type FormEvent } from "react";
import {
  Phone,
  MessageCircle,
  Navigation,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";

import { services } from "../data";
import { Btn, Title } from "./ui";

const inputClass =
  "w-full rounded-2xl border border-sand bg-white px-4 py-3.5 text-base";

/* =========================================================
   CTA SECTION
========================================================= */

export function CTA() {
  return (
    <section className="mx-5 my-10 rounded-[40px] bg-gradient-to-br from-white via-lav to-mint p-10 text-center shadow-soft md:p-20">
      <h2 className="text-4xl font-extrabold tracking-tight md:text-7xl">
        Ready to Love Your Smile?
      </h2>

      <p className="mt-4 text-lg text-ink/60">
        Your next smile starts with one appointment.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {/* Book Appointment */}
        <Btn href="#book">Book an Appointment</Btn>

        {/* Call Clinic */}
        <Btn href="tel:+917002273231" dark={false}>
          <Phone size={16} />
          Call the Clinic
        </Btn>
      </div>
    </section>
  );
}

/* =========================================================
   APPOINTMENT FORM
========================================================= */

export function AppointmentForm() {
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    /* Get form values */
    const name = formData.get("name")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const date = formData.get("date")?.toString() || "";
    const time = formData.get("time")?.toString() || "";
    const treatment = formData.get("treatment")?.toString() || "";
    const message = formData.get("message")?.toString().trim() || "";

    /*
     * WhatsApp number
     *
     * 91 = India country code
     * 7002273231 = clinic WhatsApp number
     *
     * Final number:
     * 917002273231
     */
    const whatsappNumber = "917002273231";

    /* WhatsApp message */
    const whatsappMessage = `
*Pearl Dental Clinic*
*New Appointment Request*

👤 *Patient Name:* ${name}

📱 *Phone:* ${phone}

📧 *Email:* ${email || "Not provided"}

📅 *Preferred Date:* ${date}

⏰ *Preferred Time:* ${time}

🦷 *Treatment:* ${treatment}

💬 *Message:* ${message || "No message provided"}
    `.trim();

    /*
     * Create WhatsApp URL
     */
    const whatsappUrl =
      `https://wa.me/${whatsappNumber}` +
      `?text=${encodeURIComponent(whatsappMessage)}`;

    /*
     * Open WhatsApp
     *
     * On mobile:
     * WhatsApp application will normally open.
     *
     * On desktop:
     * WhatsApp Web will normally open.
     */
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    /* Show success message */
    setDone(true);
  };

  return (
    <section id="book" className="mx-auto max-w-3xl px-5 py-20">
      <Title>Book your visit.</Title>

      <p className="mb-8 mt-3 text-ink/60">
        Fill in your details and send your appointment request directly to Pearl
        Dental Clinic on WhatsApp.
      </p>

      {done ? (
        <div role="status" className="rounded-[32px] bg-mint p-10 text-center">
          <h3 className="text-2xl font-extrabold">
            Appointment Request Ready!
          </h3>

          <p className="mt-3 text-ink/70">
            WhatsApp has been opened with your appointment details. Please press{" "}
            <strong>Send</strong> to submit your request.
          </p>

          <button
            type="button"
            onClick={() => setDone(false)}
            className="mt-6 rounded-full bg-ink px-6 py-3 font-bold text-pearl transition hover:scale-[1.02] active:scale-95"
          >
            Book Another Appointment
          </button>
        </div>
      ) : (
        <form
          onSubmit={submit}
          className="grid gap-4 rounded-[32px] border border-sand bg-white p-6 shadow-soft sm:grid-cols-2 md:p-10"
        >
          {/* =================================================
              FULL NAME
          ================================================== */}

          <input
            required
            name="name"
            type="text"
            aria-label="Full name"
            placeholder="Full name"
            autoComplete="name"
            className={inputClass}
          />

          {/* =================================================
              PHONE NUMBER
          ================================================== */}

          <input
            required
            name="phone"
            type="tel"
            aria-label="Phone number"
            placeholder="Phone number"
            autoComplete="tel"
            className={inputClass}
          />

          {/* =================================================
              EMAIL
          ================================================== */}

          <input
            name="email"
            type="email"
            aria-label="Email"
            placeholder="Email"
            autoComplete="email"
            className={`${inputClass} sm:col-span-2`}
          />

          {/* =================================================
              DATE
          ================================================== */}

          <input
            required
            name="date"
            type="date"
            aria-label="Preferred date"
            className={inputClass}
          />

          {/* =================================================
              TIME
          ================================================== */}

          <input
            required
            name="time"
            type="time"
            aria-label="Preferred time"
            className={inputClass}
          />

          {/* =================================================
              TREATMENT
          ================================================== */}

          <select
            required
            name="treatment"
            aria-label="Treatment"
            className={`${inputClass} sm:col-span-2`}
          >
            <option value="">Select Treatment</option>

            {services.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>

          {/* =================================================
              MESSAGE
          ================================================== */}

          <textarea
            name="message"
            aria-label="Message"
            placeholder="Message (optional)"
            rows={4}
            className={`${inputClass} sm:col-span-2`}
          />

          {/* =================================================
              SUBMIT BUTTON
          ================================================== */}

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-full bg-ink py-4 font-bold text-pearl transition hover:scale-[1.02] active:scale-95 sm:col-span-2"
          >
            <MessageCircle size={20} />
            Book Appointment
          </button>

          <p className="text-center text-sm text-ink/50 sm:col-span-2">
            Your appointment details will be sent to WhatsApp:{" "}
            <strong>+91 7002273231</strong>
          </p>
        </form>
      )}
    </section>
  );
}

/* =========================================================
   CONTACT SECTION
========================================================= */

export function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto grid max-w-7xl gap-8 px-5 py-20 md:grid-cols-2"
    >
      {/* =================================================
          CLINIC INFORMATION
      ================================================== */}

      <div>
        <Title>Visit Pearl.</Title>

        <p className="font-bold">Pearl Dental Clinic</p>

        <p className="text-ink/60">
          Hengrabari road,housing tiniali(near prajapati bhawan)dispur ghy 06,
          Guwahati, Assam 781036
          <br />
          Phone: +91 7002273231
          <br />
          Mon–Sun 9:00AM–8:00PM ·
        </p>

        {/* =================================================
            CONTACT BUTTONS
        ================================================== */}

        <div className="mt-6 flex flex-wrap gap-3">
          {/* Call */}
          <Btn href="tel:+917002273231">
            <Phone size={16} />
            Call
          </Btn>

          {/* WhatsApp */}
          <Btn href="https://wa.me/917002273231" dark={false}>
            <MessageCircle size={16} />
            WhatsApp
          </Btn>

          {/* Google Maps */}
          <Btn
            href="https://maps.google.com/?q=Pearl+Dental+Clinic+Mumbai"
            dark={false}
          >
            <Navigation size={16} />
            Directions
          </Btn>
        </div>
      </div>

      {/* =================================================
          GOOGLE MAP
      ================================================== */}

      <iframe
        title="Pearl Dental Clinic map"
        loading="lazy"
        className="min-h-72 w-full rounded-[32px] border-0"
        src="https://www.google.com/maps?q=26.15096153001535,91.7902074159988&z=17&output=embed"
      />
    </section>
  );
}

/* =========================================================
   FOOTER
========================================================= */

export function Footer() {
  const socialLinks = [
    {
      icon: Instagram,
      label: "Instagram",
      href: "#",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "#",
    },
    {
      icon: Youtube,
      label: "YouTube",
      href: "#",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/917002273231",
    },
  ];

  const footerLinks = [
    "Home",
    "About",
    "Services",
    "Packages",
    "Gallery",
    "Reviews",
    "Contact",
  ];

  return (
    <footer className="mt-10 bg-ink px-5 pb-28 pt-16 text-pearl sm:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        {/* =================================================
            CLINIC
        ================================================== */}

        <div>
          <p className="text-2xl font-extrabold">Pearl Dental Clinic</p>

          <p className="text-pearl/60">
            Modern dentistry for confident smiles.
          </p>

          {/* Social Media */}
          <div className="mt-4 flex gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* =================================================
            FOOTER LINKS
        ================================================== */}

        <ul className="grid grid-cols-2 gap-2 text-pearl/70">
          {footerLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="transition hover:text-pearl"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* =================================================
          COPYRIGHT
      ================================================== */}

      <p className="mx-auto mt-10 max-w-7xl text-sm text-pearl/50">
        Privacy Policy · Terms & Conditions · © {new Date().getFullYear()} Pearl
        Dental Clinic
      </p>
    </footer>
  );
}
