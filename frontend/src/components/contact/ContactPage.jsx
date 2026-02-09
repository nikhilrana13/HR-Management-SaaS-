import React from 'react'


export const metadata = {
  title: "Contact HRFlow | Get in Touch",
  description:
    "Contact HRFlow for support, feedback, or business inquiries. We’re here to help modern teams streamline HR operations.",
};
const ContactPage = () => {
  return (
    <main className="w-full bg-[#f8fafc] text-[#0d101b]">
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-[#1337ec]/10 text-[#1337ec]">
          Contact Us
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Let’s talk 👋
        </h1>
        <p className="text-lg text-[#4c599a] max-w-2xl mx-auto">
          Have a question, feedback, or idea? Reach out and we’ll get back to you
          as soon as possible.
        </p>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT INFO */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">
            We’d love to hear from you
          </h2>
          <p className="text-[#4c599a] mb-8 max-w-md">
            Whether you’re exploring HRFlow, facing an issue, or just want to
            say hello — feel free to contact us.
          </p>

          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-[#4c599a] uppercase">
                Email
              </p>
              <p className="font-medium">support@hrflow.app</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#4c599a] uppercase">
                Phone
              </p>
              <p className="font-medium">+91 9XXXXXXXXX</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-[#4c599a] uppercase">
                Availability
              </p>
              <p className="font-medium">
                Monday – Friday, 9:00 AM – 6:00 PM IST
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white rounded-2xl border border-[#e7e9f3] shadow-sm p-8">
          <h3 className="text-xl font-bold mb-6">Send us a message</h3>

          <form className="space-y-5">
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-[#4c599a] mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full h-11 px-4 rounded-lg border border-[#cfd3e7] focus:ring-2 focus:ring-[#1337ec]/30 outline-none"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-[#4c599a] mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full h-11 px-4 rounded-lg border border-[#cfd3e7] focus:ring-2 focus:ring-[#1337ec]/30 outline-none"
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label className="block text-sm font-semibold text-[#4c599a] mb-1">
                Subject
              </label>
              <input
                type="text"
                placeholder="How can we help?"
                className="w-full h-11 px-4 rounded-lg border border-[#cfd3e7] focus:ring-2 focus:ring-[#1337ec]/30 outline-none"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm font-semibold text-[#4c599a] mb-1">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-lg border border-[#cfd3e7] focus:ring-2 focus:ring-[#1337ec]/30 outline-none resize-none"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full h-12 rounded-lg bg-[#1337ec] text-white font-bold hover:bg-[#1337ec]/90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ================= CTA STRIP ================= */}
      <section className="bg-[#1337ec]/5 py-16 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Building HRFlow as a learning & portfolio project
        </h2>
        <p className="text-[#4c599a] max-w-xl mx-auto">
          Feedback and suggestions are always welcome
        </p>
      </section>
    </main>
  )
}

export default ContactPage