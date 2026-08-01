import React from "react";
import HeroSection from "./_components/HeroSection";
import { getAllCategories } from "./_actions/getAllCategories";
import CategoryList from "./_components/category/CategoryList";

const LandingPage = async () => {
  const categories = await getAllCategories();
  return (
    <div className="container mx-auto">
      <HeroSection />
      <CategoryList categories={categories} />
    </div>
  );
};

export default LandingPage;
