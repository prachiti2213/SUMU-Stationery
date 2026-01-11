import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Linkedin } from "lucide-react";
import { PageRoute } from "../types";


/* ================= NAV LINK ================= */
const NavLink = ({
  to,
  children,
  mobile = false,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const baseClasses = mobile
    ? "block px-3 py-2 text-sm font-medium tracking-wide uppercase transition-colors"
    : "text-[13px] font-semibold tracking-[0.3em] uppercase transition-colors";

  const activeClasses = isActive
    ? "text-sumu-wood"
    : "hover:text-sumu-wood";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

/* ================= FOOTER ================= */
const Footer = () => (
  <footer className="bg-sumu-charcoal text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-serif">
            SUMU
            <span className="text-xs ml-2 tracking-[0.35em] uppercase text-gray-400">
              Stationery
            </span>
          </h3>
          <p className="text-gray-400 text-sm mt-4 leading-relaxed">
            Crafting the finest writing instruments for over 25 years. Rooted in
            quality, trust, and consistency.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-sumu-wood">
            Explore
          </h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to={PageRoute.PRODUCTS}>Products</Link></li>
            <li><Link to={PageRoute.ABOUT}>About</Link></li>
            <li><Link to={PageRoute.GALLERY}>Gallery</Link></li>
            <li><Link to={PageRoute.BLOG}>Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-sumu-wood">
            Contact
          </h4>
          <p className="text-gray-400 text-sm">Pune, India</p>
          <p className="text-gray-400 text-sm">+91 9022854954</p>
          <p className="text-gray-400 text-sm">sumustationery@gmail.com</p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.3em] uppercase mb-6 text-sumu-wood">
            Social
          </h4>
          <div className="flex gap-4 text-gray-400">
            <Instagram />
            <Facebook />
            <Linkedin />
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-white/10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} SUMU Stationery. All rights reserved.
      </div>
    </div>
  </footer>
);

/* ================= LAYOUT ================= */
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === PageRoute.HOME;

  return (
    <div className="min-h-screen flex flex-col">

      {/* ================= NAVBAR ================= */}
      <nav
  className={`fixed top-0 w-full z-40 h-20 border-b border-white/10
  ${
    isHome
      ? "bg-white/10 backdrop-blur-md text-white"
      : "bg-white/70 backdrop-blur-md text-sumu-charcoal shadow-sm"
  }`}
>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link
              to={PageRoute.HOME}
              className="text-3xl font-serif uppercase tracking-tight"
            >
              SUMU
             <span className="ml-2 text-[10px] tracking-[0.4em] uppercase font-medium text-current opacity-90">
  Stationery
</span>

            </Link>

            {/* DESKTOP LINKS */}
            <div className="hidden md:flex items-center gap-10">
              <NavLink to={PageRoute.HOME}>Home</NavLink>
              <NavLink to={PageRoute.ABOUT}>About</NavLink>
              <NavLink to={PageRoute.PRODUCTS}>Products</NavLink>
              <NavLink to={PageRoute.AUDIENCE}>Audience</NavLink>
              <NavLink to={PageRoute.GALLERY}>Gallery</NavLink>
              <NavLink to={PageRoute.BLOG}>Blog</NavLink>

              {/* CONTACT BUTTON */}
              <Link
                to={PageRoute.CONTACT}
                className={`border px-6 py-2 text-[11px] tracking-[0.35em] uppercase transition
                ${
                  isHome
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-sumu-charcoal text-sumu-charcoal hover:bg-sumu-charcoal hover:text-white"
                }`}
              >
                Contact
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-black text-white border-t border-white/10 px-6 py-4 space-y-3">
            <NavLink mobile to={PageRoute.HOME} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink mobile to={PageRoute.ABOUT} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink mobile to={PageRoute.PRODUCTS} onClick={() => setIsOpen(false)}>Products</NavLink>
            <NavLink mobile to={PageRoute.GALLERY} onClick={() => setIsOpen(false)}>Gallery</NavLink>
            <NavLink mobile to={PageRoute.BLOG} onClick={() => setIsOpen(false)}>Blog</NavLink>
            <NavLink mobile to={PageRoute.CONTACT} onClick={() => setIsOpen(false)}>Contact</NavLink>
          </div>
        )}
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <main className="flex-grow ">
        {children}
      </main>

      <Footer />
    </div>
  );
};