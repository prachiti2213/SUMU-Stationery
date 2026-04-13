import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { ContentProvider } from "./context/ContentContext";
import { Layout } from "./components/Layout";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { TargetAudience } from "./pages/TargetAudience";
import { Gallery } from "./pages/Gallery";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Admin } from "./pages/Admin";

import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import { PageRoute } from "./types";

/* ================= SCROLL TO TOP ================= */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/* ================= PLACEHOLDER ================= */
const ServicesPlaceholder = () => (
  <div className="py-20 text-center bg-white">
    <h1 className="text-4xl font-serif mb-4">Our Services</h1>
    <p className="text-gray-500">Coming soon.</p>
  </div>
);

/* ================= APP ================= */
const App = () => {
  return (
    <ContentProvider>
      <Router>
        <ScrollToTop />

        <Routes>
          {/* Admin without layout */}
          <Route path={PageRoute.ADMIN} element={<Admin />} />

          {/* All website pages with Layout */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path={PageRoute.HOME} element={<Home />} />
                  <Route path={PageRoute.ABOUT} element={<About />} />
                  <Route path={PageRoute.PRODUCTS} element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route
                    path={PageRoute.AUDIENCE}
                    element={<TargetAudience />}
                  />
                  <Route
                    path={PageRoute.SERVICES}
                    element={<ServicesPlaceholder />}
                  />
                  <Route path={PageRoute.GALLERY} element={<Gallery />} />
                  <Route path={PageRoute.BLOG} element={<Blog />} />
                  <Route path={PageRoute.CONTACT} element={<Contact />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy />}
                  />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </Router>
    </ContentProvider>
  );
};

export default App;