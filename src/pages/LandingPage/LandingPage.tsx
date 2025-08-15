import LandingPageNavbar from '../../components/landing/LandingPageNavbar';
import HeroSection from '../../components/landing/HeroSection';
import FeaturesSection from '../../components/landing/FeaturesSection';
import PricingSection from '../../components/landing/PricingSection';
import ContactSection from '../../components/landing/ContactSection';
import Footer from '../../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LandingPageNavbar />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
