import React from 'react';

const AboutSection = () => {
  return (
    <section id="about-section" className="px-5 h-[32rem]">
      <div className="flex flex-col items-center">
        <h2 className="text-7xl font-bold text-center lg:text-[90px] py-20">About Us</h2>

        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12 items-center">
          <h2 className="text-4xl lg:text-6xl font-bold col-span-12 lg:col-span-4 lg:col-start-3 text-center lg:text-start">
            Our Mission
          </h2>
          <p className="text-lg text-center lg:text-right col-span-12 lg:col-span-4">
            Long description goes here lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam
            vel eros sit amet arcu vestib
          </p>

          <h2 className="block lg:hidden text-4xl  font-bold col-span-12 text-center mt-10">
            Our Vision
          </h2>
          <p className="text-lg text-center lg:text-left col-span-12 lg:col-start-3 lg:col-span-4 mt-6 lg:mt-8">
            Long description goes here lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam
            vel eros sit amet arcu vestib
          </p>
          <h2 className="hidden lg:block text-6xl font-bold col-span-4 text-end ">Our Vision</h2>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
