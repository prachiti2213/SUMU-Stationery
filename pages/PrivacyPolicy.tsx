//@ts-nocheck

import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* SCROLL REVEAL */
const useScrollReveal = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

export default function PrivacyPolicy() {

  useEffect(() => {
    document.title = "Privacy Policy | SUMU Stationery";
  }, []);

  return (
    <div className="min-h-screen text-gray-800 bg-[#faf7f2]">

      {/* HERO */}
      <section className="py-16 sm:py-20 md:py-28 text-center border-b border-gray-200 bg-gradient-to-b from-[#faf7f2] to-white px-4">

        <div className="flex flex-col items-center max-w-xl mx-auto px-4">

         <span className="w-16 h-[4px] bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full mb-5 shadow-sm"></span>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-900 mb-2 sm:mb-3 tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Transparency • Trust • Protection
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="py-12 sm:py-16 md:py-24 px-4">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-10">

          <Paragraph>
            Thank you for visiting <span className="text-yellow-500 font-medium">www.sumustationery.com</span>. 
            At SUMU Stationery, we respect your privacy and consider the protection of your personal information an essential part of our business. 
            This Privacy Policy explains how information is collected, used, and protected when you interact with our website. 
            This policy applies only to information collected through our website and does not extend to other channels or services.
          </Paragraph>

          <Paragraph>
            We may collect certain information from you when you voluntarily provide it, such as through contact forms, inquiries, or feedback submissions. 
            This information is used solely to improve your experience, respond to your requests, and enhance our services. 
            We do not collect personal data without your consent, and we do not sell, trade, or share your information with third parties except where required by law.
          </Paragraph>

          <Paragraph>
            Our website may use cookies and similar technologies to improve functionality and analyze usage patterns. 
            These cookies help us understand user behavior, optimize performance, and provide a smoother browsing experience. 
            You may choose to disable cookies through your browser settings if you prefer not to share such data.
          </Paragraph>

          <Paragraph>
            We may include links to third-party websites for your convenience and reference. 
            However, we are not responsible for the content, policies, or practices of these external sites. 
            We encourage you to review their privacy policies before sharing any personal information.
          </Paragraph>

          <Paragraph>
            We take reasonable and appropriate measures to protect your information from unauthorized access, disclosure, or misuse. 
            While we strive to ensure data security, no method of transmission over the internet can be guaranteed to be completely secure.
          </Paragraph>

          <Paragraph>
            All content, materials, and intellectual property on this website belong to SUMU Stationery and are protected under applicable laws. 
            Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
          </Paragraph>

          <Paragraph>
            We reserve the right to update or modify this Privacy Policy at any time. 
            Any changes will be reflected on this page, and we encourage you to review it periodically to stay informed.
          </Paragraph>

          <Paragraph>
            This Privacy Policy is governed by the laws of India. 
            If you have any questions or concerns regarding this policy, you may contact us at 
            <span className="text-yellow-500 font-medium"> support@sumustationery.com</span>.
          </Paragraph>

          <Paragraph>
            SUMU Stationery is committed to providing high-quality products and maintaining transparency in all interactions with our users. 
            We strive to build trust by ensuring that your personal information is handled responsibly and used only for legitimate business purposes. 
            Our goal is to create a safe, reliable, and user-friendly experience for everyone who visits our platform.
          </Paragraph>

          <Paragraph>
            If you have any questions, concerns, or requests regarding this Privacy Policy or how your data is handled, please feel free to contact us. 
            You can reach out via email at 
            <span className="text-yellow-500 font-medium"> support@sumustationery.com</span>. 
            We are always here to assist you and ensure your experience remains secure and trustworthy.
          </Paragraph>

        </div>
      </section>

      <CTA />
      <ScrollProgress />

    </div>
  );
}

/* PARAGRAPH */
function Paragraph({ children }: any) {
  const { ref, visible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`border-l-2 border-yellow-400 pl-4 sm:pl-5 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose">
        {children}
      </p>
    </div>
  );
}

/* CTA */
function CTA() {
  const { ref, visible } = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section
      ref={ref}
      className={`text-center py-16 sm:py-20 md:py-24 px-4 border-t border-gray-200 bg-gradient-to-b from-white to-[#faf7f2] transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-gray-900">
        Your Trust Matters
      </h2>

      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
        We are committed to protecting your privacy.
      </p>

      <button
        onClick={() => navigate("/contact")}
        className="relative overflow-hidden border border-gray-900 px-6 sm:px-8 py-2 sm:py-3 text-[10px] sm:text-xs tracking-widest uppercase group rounded-md"
      >
        <span className="relative z-10 group-hover:text-white transition">
          Contact Us
        </span>

        <span className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition duration-500" />
      </button>
    </section>
  );
}

/* SCROLL BAR (SMOOTH) */
function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const height = document.body.scrollHeight - window.innerHeight;
          setWidth((scrollTop / height) * 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-gray-200 z-50">
      <div className="h-full bg-yellow-400" style={{ width: `${width}%` }} />
    </div>
  );
}