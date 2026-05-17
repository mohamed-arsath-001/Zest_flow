import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/components/HomePage";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/ui/global/Navbar";
import Footer from "@/components/ui/global/Footer";
import AboutUsPage from "@/pages/AboutUsPage";
import ServicesPage from "@/pages/ServicesPage";
import ServiceDetailPage from "@/pages/ServiceDetailPage";
import BlogsPage from "@/pages/BlogsPage";
import BlogPostPage from "@/pages/BlogPostPage";

function App() {
  return (
    <div className="App">
      <CustomCursor />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogPostPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
