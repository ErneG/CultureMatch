import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="h-full w-full pt-44 md:pt-44 relative flex items-center justify-center flex-col px-5 mb-10">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e6e6e6_1px,transparent_1px),linear-gradient(to_bottom,#e6e6e6_1px,transparent_1px)] bg-[size:4rem_4rem] -z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white via-white/70 to-transparent filter blur-lg -z-10" />

      <p className="text-center">Find a work enviroment that fits you well</p>
      <div className=" relative">
        <h1 className="text-6xl font-bold text-center md:text-[90px] lg:text-[130px] xl:text-[200px] ">
          CultureMatch
        </h1>
      </div>
      <div className="flex justify-center items-center relative mt-[-10px] md:lg:mt-[-20px] lg:mt-[-30px] xl:mt-[-40px]">
        <Image
          priority
          src={'/DashboardImage.webp'}
          alt="banner image"
          height={1200}
          width={1200}
          className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted mx-5 md:mx-10 "
        />
        <div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10"></div>
      </div>
    </section>
  );
};

export default HeroSection;
