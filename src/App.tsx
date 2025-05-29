import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import EmailExtractor from './components/EmailExtractor';
import Features from './components/Features';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ThemeProvider from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <EmailExtractor />
          <Features />
          <FAQ />
          <Testimonials />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;