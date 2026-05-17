import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import FeatureHighlight from "@/components/ui/home/FeatureHighlight";
import Stats from "@/components/ui/home/Stats";
import Testimonials from "@/components/ui/home/Testimonials";
import CTA from "@/components/ui/home/CTA";

const HomePage = () => (
  <>
    <Hero />
    <Features />
    <Benefits />
    <FeatureHighlight />
    <Stats />
    <Testimonials />
    <CTA />
  </>
);

export default HomePage;
