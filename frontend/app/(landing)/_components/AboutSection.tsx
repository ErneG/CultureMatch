const AboutSection = () => {
  return (
    <section id="about-section" className="px-5">
      <div className="flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-bold text-center lg:text-[90px] py-20">
          About Us
        </h2>

        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12 items-center">
          <h2 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-4 lg:col-start-3 text-center lg:text-start">
            Our Mission
          </h2>
          <p className="text-lg text-center lg:text-right col-span-12 lg:col-span-4">
            To transform the work experience by connecting people with companies that prioritize
            mental well-being, shared values, and healthy growth. We empower job seekers to choose
            workplaces where they can thrive, recharge, and feel genuinely valued—not just for their
            skills but for their well-being.
          </p>

          <h2 className="block lg:hidden text-4xl font-bold col-span-12 text-center mt-10">
            Our Vision
          </h2>
          <p className="text-lg text-center lg:text-left col-span-12 lg:col-start-3 lg:col-span-4 mt-6 lg:mt-8">
            To create a future where work enhances well-being, growth, and fulfillment, we envision
            transparent workplace culture and a commitment to health as the standard.
          </p>
          <h2 className="hidden lg:block text-6xl font-bold col-span-4 text-end">Our Vision</h2>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
