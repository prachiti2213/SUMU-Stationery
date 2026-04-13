//@ts-nocheck
import React, { useState } from "react";
import { Briefcase, CheckCircle, X } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import emailjs from "@emailjs/browser";

 
export default function Careers() {

  const [form, setForm] = useState({
    email: "",
    department: "",
    expertise: "",
    linkedin: "",
    cv: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 60, damping: 25 });
  const smoothY = useSpring(rotateY, { stiffness: 60, damping: 25 });

  const handleMouseMove = (e: any) => {
    if (window.innerWidth < 768) return;

    const { innerWidth, innerHeight } = window;
    const x = (e.clientY / innerHeight - 0.5) * 10;
    const y = (e.clientX / innerWidth - 0.5) * 10;

    rotateX.set(-x);
    rotateY.set(y);
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);

  // ✅ 1. Send to Admin
  emailjs.send(
    "service_ia85mqk",
    "template_v2zp4y6",
    {
    

      full_details: `
New Job Application

Email: ${form.email}
Department: ${form.department}
LinkedIn: ${form.linkedin}
Skills: ${form.expertise}
Resume: ${form.cv?.name || "No file"}
      `
    },
    "VIBaMJ1QC8GKfLS9V"
  );

  // ✅ 2. Auto Reply to User
  emailjs.send(
    "service_ia85mqk",
    "template_n0mjqnm", // 
    {
      email: form.email,
      department: form.department
    },
    "VIBaMJ1QC8GKfLS9V"
  )
  .then(() => {
    setLoading(false);
    setSubmitted(true);
  })
  .catch(() => {
    setLoading(false);
    alert("Error sending email");
  });
};
  const selectDepartment = (dept: string) => {
    setForm((prev) => ({ ...prev, department: dept }));
    setOpenModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100 text-gray-900">

      {/* ================= HERO ================= */}
      <section
        onMouseMove={handleMouseMove}
        className="py-20 sm:py-24 md:py-32 text-center relative overflow-hidden px-4 bg-cover bg-center"
        style={{
          perspective: "1000px",
          backgroundImage: "url('/images/career.png')"
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute w-[200px] sm:w-[250px] md:w-[350px] h-[200px] sm:h-[250px] md:h-[350px] bg-yellow-400/20 blur-[80px] rounded-full top-[-60px] sm:top-[-80px] left-1/2 -translate-x-1/2"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ rotateX: smoothX, rotateY: smoothY }}
          className="relative z-10 space-y-3 sm:space-y-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Growing Ideas into Impact
          </h1>

          <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-200">
            with creativity and commitment
          </h2>
        </motion.div>
      </section>

      {/* ================= CULTURE ================= */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#f5f5dc]">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-5xl"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-900">
            Our Culture
          </h3>

          <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
            At our core, we believe that a company grows only when its people grow.
            Here, no one works for someone; we work alongside each other, united by purpose.
            Commitment, honesty, and respect for our work form the foundation of everything we do.
          </p>
        </motion.div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="py-16 md:py-24 px-4">

        {/* HEADING */}
        <div className="text-center mb-10 md:mb-14 px-4">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 flex items-center justify-center gap-2 sm:gap-3 flex-wrap"
          >
            <span className="w-[3px] sm:w-[4px] h-6 sm:h-8 md:h-10 bg-yellow-400 rounded-full"></span>

            <span className="relative">
              Explore Opportunities
            
            </span>

             <span className="w-[3px] sm:w-[4px] h-6 sm:h-8 md:h-10 bg-yellow-400 rounded-full"></span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-5 sm:mt-6 text-gray-500 text-xs sm:text-sm md:text-lg max-w-xl sm:max-w-2xl mx-auto"
          >
            Join us in building a <span className="text-yellow-500 font-semibold">global brand</span> where passionate minds turn their skills into leadership and recognition.
          </motion.p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-10 max-w-6xl mx-auto px-2 sm:px-0">

          {[
            { title: "Product Design & R&D", img: "/images/design.jpg" },
            { title: "Operations & Supply Chain", img: "/images/operations.jpg" },
            { title: "Procurement & Contracts", img: "/images/procurement.jpg" },
            { title: "Sales & Business Development", img: "/images/sales.jpg" },
            { title: "Marketing & Brand Communication", img: "/images/marketing.jpg" },
            { title: "Finance & Administration", img: "/images/finance.jpg" },
            { title: "Legal & Compliance", img: "/images/legal.jpg" }
          ].map((item) => (

            <motion.div
              key={item.title}
              onClick={() => selectDepartment(item.title)}
              whileHover={{ scale: 1.02 }}
              className="group relative h-[180px] sm:h-[200px] md:h-[240px] rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl"
            >
              <img src={item.img} alt={item.title} loading="lazy" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-3">
                <h3 className="text-xs sm:text-sm md:text-lg font-semibold mb-2">
                  {item.title}
                </h3>

                <button className="text-[10px] sm:text-xs md:text-sm px-4 py-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-yellow-400 hover:text-black transition">
                  Apply Now →
                </button>
              </div>
            </motion.div>

          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-[#fffaf0] via-white to-[#f5f5dc]">

  {/* HEADING */}
  <div className="text-center mb-12">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
      Why Join Us
    </h2>
    <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
      Be part of a team where growth, innovation, and collaboration drive success.
    </p>
  </div>

  {/* CARDS */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

    {[
      { icon: "🚀", title: "Fast Growth", desc: "Grow your career with real opportunities and leadership exposure.", color: "bg-orange-100 text-orange-500" },
      { icon: "🤝", title: "Team Culture", desc: "Work in a collaborative and supportive environment.", color: "bg-pink-100 text-pink-500" },
      { icon: "💡", title: "Innovation", desc: "Bring your ideas to life and work on impactful projects.", color: "bg-yellow-100 text-yellow-500" },
      { icon: "🌍", title: "Global Vision", desc: "Be part of building a brand with global ambitions.", color: "bg-violet-100 text-violet-500" }
    ].map((item, i) => (

      <div
        key={i}
        className="p-6 rounded-xl bg-white shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 text-center"
      >

        {/* ICON WITH COLOR */}
        <div className={`w-12 h-12 mx-auto flex items-center justify-center rounded-full mb-4 ${item.color}`}>
          <span className="text-xl">{item.icon}</span>
        </div>

        {/* TITLE */}
        <h3 className="font-semibold text-gray-900 mb-2">
          {item.title}
        </h3>

        {/* DESC */}
        <p className="text-gray-500 text-sm leading-relaxed">
          {item.desc}
        </p>

      </div>

    ))}

  </div>

</section>

{/* ================= MODAL ================= */}
{openModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

    <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">

      {/* CLOSE BUTTON */}
      <button
        onClick={() => {
          setOpenModal(false);
          setSubmitted(false);
        }}
        className="absolute top-4 right-4 text-gray-500 hover:text-black"
      >
        <X />
      </button>

      {!submitted ? (
        <>
          {/* HEADER */}
          <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
            <Briefcase size={18}/> Apply Now
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* SELECTED ROLE */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Selected Role
              </label>

              <div className="w-full border px-4 py-2 rounded-lg bg-yellow-50 text-yellow-700 font-medium">
                {form.department}
              </div>
            </div>

            {/* EMAIL */}
            <input
              name="email"
              required
              placeholder="Email"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            {/* EXPERTISE */}
            <textarea
              name="expertise"
              rows={3}
              required
              placeholder="Your skills..."
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            {/* LINKEDIN */}
            <input
              name="linkedin"
              required
              placeholder="LinkedIn"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />

            {/* FILE UPLOAD */}
            <div>
              <label className="text-sm text-gray-500 mb-1 block">
                Upload Resume (PDF)
              </label>

              <input
                type="file"
                accept=".pdf"
                required
                onChange={(e: any) =>
                  setForm({ ...form, cv: e.target.files[0] })
                }
                className="w-full border px-3 py-2 rounded-lg bg-gray-50 cursor-pointer"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-yellow-500 hover:text-black transition">
              {loading ? "Submitting..." : "Submit Application"}
            </button>

          </form>
        </>
      ) : (
        <div className="text-center py-10">

          {/* SUCCESS ANIMATION */}
          <div className="flex justify-center mb-4">
            <div className="bg-yellow-100 p-3 rounded-full animate-bounce">
              <CheckCircle className="text-yellow-500" size={28}/>
            </div>
          </div>

          <h3 className="font-semibold text-lg">
            Application Submitted
          </h3>

          <p className="text-gray-500 text-sm mt-1">
            Our team will contact you soon.
          </p>

        </div>
      )}

    </div>

  </div>
)}

  </div>);
}