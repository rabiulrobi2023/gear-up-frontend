import React from "react";
import HeroSection from "./_components/home/HeroSection";
import { getAllCategories } from "./_actions/getAllCategories";
import CategoryList from "./_components/category/CategoryList";

const LandingPage = async () => {
  const categories = await getAllCategories();

  return (
    <div className="mx-auto ">
      <HeroSection />
      <div className="container mx-auto px-2 md:px-0">
        <h1 className="pt-6 text-xl font-bold">Categories</h1>
        <CategoryList categories={categories} />
      </div>
    </div>
  );
};

export default LandingPage;
