import React, { useEffect, useState } from 'react'

const RecipeList = () => {
    const [recipes,setRecipes]=useState([]);
    const [query,setQuery]='pasta'
    useEffect(()=>{
        fetchRecipes();
    },[])
    const fetchRecipes= async ()=>{
        try {
            const response= await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=74a51e1ce0584db48b54a1ce8eee948e`
            );
            const data=await response.json();
            console.log(data);
        } catch (error) {
            
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default RecipeList
