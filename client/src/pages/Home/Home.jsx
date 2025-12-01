import React from "react";
import HeroSection from "../../components/HomePageComponents/Banner/HeroSection";
import FeaturedCategories from "../../components/HomePageComponents/FeaturedCategories/FeaturedCategories";
import PopulerCourses from "../../components/HomePageComponents/PopulerCourses/PopulerCourses";
import CtaBanner from "../../components/HomePageComponents/CTABanner/CTABanner";

const Home = () => {
  return (
    <div>
      {/* <Banner /> */}
      <HeroSection />
      <FeaturedCategories />
      <PopulerCourses />
      <CtaBanner />
    </div>
  );
};

export default Home;
