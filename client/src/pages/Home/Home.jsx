import React from "react";
import HeroSection from "../../components/HomePageComponents/Banner/HeroSection";
import FeaturedCategories from "../../components/HomePageComponents/FeaturedCategories/FeaturedCategories";
import PopulerCourses from "../../components/HomePageComponents/PopulerCourses/PopulerCourses";
import CtaBanner from "../../components/HomePageComponents/CTABanner/CTABanner";

const Home = () => {
  const populerCourses = [
    {
      _id: "1",
      title: "Full Stack Web Development",
      instructor: "John Doe",
      rating: 4.9,
      price: 49.99,
      thumbnail:
        "https://www.keycdn.com/img/support/full-stack-development.png",
    },
    {
      _id: "2",
      title: "Mobile App Development with React Native",
      instructor: "Sarah Khan",
      rating: 4.8,
      price: 39.99,
      thumbnail:
        "https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg",
    },
    {
      _id: "3",
      title: "UI/UX Design Complete Course",
      instructor: "Emily Watson",
      rating: 4.7,
      price: 29.99,
      thumbnail:
        "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg",
    },
    {
      _id: "4",
      title: "Data Science",
      instructor: "Emily Watson",
      rating: 4.7,
      price: 29.99,
      thumbnail:
        "https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg",
    },
  ];
  return (
    <div>
      {/* <Banner /> */}
      <HeroSection />
      <FeaturedCategories />
      <PopulerCourses courses={populerCourses} />
      <CtaBanner />
    </div>
  );
};

export default Home;
