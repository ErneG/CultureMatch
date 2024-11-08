import AboutSection from './_components/AboutSection';
import HeroSection from './_components/HeroSection';
import TeamSection from '@/app/(landing)/_components/TeamSection';

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <section className="h-10" />

      <TeamSection />
      <section className="h-20" />
    </>
  );
};

export default LandingPage;
