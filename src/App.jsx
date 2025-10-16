import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import PackagesPage from './pages/PackagesPage';
import PackageDetailPage from './pages/PackageDetailPage';
import Footer from './components/Footer';
import ContactPage from './pages/ContactPage';
import SignUpPage from './pages/SignupPage';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/packages" element={<PackagesPage />} />
        <Route path="/packages/:id" element={<PackageDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

