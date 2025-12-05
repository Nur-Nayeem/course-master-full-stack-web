import React from "react";
import {
  BookOpen,
  Globe,
  Users,
  Zap,
  ShieldCheck,
  TrendingUp,
  Handshake,
  Code,
} from "lucide-react";
import VisionCard from "../../components/AboutUsComponents/VisionCard";
import FeatureCard from "../../components/AboutUsComponents/FeaturedCard";
import { FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <title>Course Master- About</title>
      <div className="container w-full bg-white shadow-sm rounded-xl overflow-hidden">
        {/* Header Section - Updated to use primary color */}
        <header className="p-8 md:p-12 bg-primary text-white text-center rounded-t-xl">
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 flex items-center justify-center space-x-3">
            <FaLaptopCode className="text-5xl hidden md:block text-white" />
            {/* <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" /> */}
            <span>About Course Master</span>
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto">
            Your production-ready E-learning platform dedicated to unlocking
            global potential through high-quality, accessible education.
          </p>
        </header>

        <main className="p-6 md:p-12">
          {/* Section 1: Our Vision - Updated colors */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-primary/20 pb-2 flex items-center">
              <Globe className="w-6 h-6 mr-3 text-primary" />
              Our Vision: Empowering Global Learners
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <VisionCard
                Icon={Handshake}
                title="Accessibility"
                description="Breaking down geographical and financial barriers to make world-class education available to everyone."
                color="text-green-600"
              />
              <VisionCard
                Icon={ShieldCheck}
                title="Quality & Trust"
                description="Curating courses taught exclusively by vetted industry experts and accredited instructors."
                color="text-yellow-600"
              />
              <VisionCard
                Icon={Zap}
                title="Innovation"
                description="Utilizing cutting-edge technology and seamless UX/UI to make learning interactive and highly effective."
                color="text-red-600"
              />
            </div>
          </section>

          {/* Section 2: Why Choose Course Master? - Feature Grid - Updated colors */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-primary/20 pb-2 flex items-center">
              <Code className="w-6 h-6 mr-3 text-primary" />
              The Course Master Advantage
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              <FeatureCard
                title="Expert-Led Content"
                detail="Learn practical, real-world skills from professionals who are leaders in their respective industries."
                Icon={Users}
              />
              <FeatureCard
                title="Flexible, Self-Paced Learning"
                detail="Access courses anytime, anywhere, on any device. Study at your own pace and fit learning into your schedule."
                Icon={TrendingUp}
              />
              <FeatureCard
                title="Production-Ready Platform"
                detail="Enjoy a seamless, intuitive, and reliable user experience built with modern technology stacks."
                Icon={BookOpen}
              />
              <FeatureCard
                title="Recognized Certifications"
                detail="Earn verifiable Certificates of Completion to validate your new skills and boost your professional profile."
                Icon={ShieldCheck}
              />
            </div>
          </section>

          {/* Section 3: Commitment - Updated colors and uses 'btn-primary' */}
          <section className="text-center bg-primary/5 p-8 rounded-xl shadow-inner">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Our Commitment to You
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              Our users are at the heart of everything we do. We are committed
              to continuous improvement and fostering a supportive community for
              all learners.
            </p>
            <Link
              to="/courses"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium btn-primary"
            >
              Explore Our Courses Now
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AboutUs;
