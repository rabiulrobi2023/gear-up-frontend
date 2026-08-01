import React from "react";
import HeroSection from "./_components/home/HeroSection";
import { getAllCategories } from "./_actions/getAllCategories";
import CategoryList from "./_components/category/CategoryList";

const LandingPage = async () => {
  const categories = await getAllCategories();
  return (
    <div className="container mx-auto ">
      <HeroSection />
      <h1 className="pt-6 text-xl font-bold">Categories</h1>
      <CategoryList categories={categories} />
    </div>
  );
};

export default LandingPage;
