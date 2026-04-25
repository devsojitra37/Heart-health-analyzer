import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Analyzer from '../components/Analyzer';
import Features from '../components/Features';
import DataVisualization from '../components/DataVisualization';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Legal from '../components/Legal';
import Footer from '../components/Footer';
import AIChatbot from '../components/AIChatbot';

const Home = ({ theme, toggleTheme }) => {
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Analyzer />
        <Features />
        <DataVisualization />
        <Testimonials />
        <Contact />
        <Legal />
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
};

export default Home;
