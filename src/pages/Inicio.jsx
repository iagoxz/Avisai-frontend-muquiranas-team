import React from 'react';
import Navbar from '../components/NavBar';
import RecipeReviewCard from '../components/Cards';
import App from "../components/slider"
const Inicio = () => {
  return (
    <div>
      <Navbar />
      <App />
      <RecipeReviewCard />
    </div>
  );
};

export default Inicio;