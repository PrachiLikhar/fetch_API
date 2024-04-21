const searchbtn=document.querySelector('.Searchbtn');
const searchbox=document.querySelector('.Searchbox');
const recipecontainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeDetails=document.querySelector('.recipe-details');
const recipeClosebtn=document.querySelector('.recipe-close-btn');

const fetchRecipes= async(query)=>{
    recipecontainer.innerHTML="<h2>Fetching recipes..</h2>";
    try {const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response= await data.json();
    recipecontainer.innerHTML="";
    response.meals.forEach(meal => {
        
        const recipediv=document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML=
        `
        <img src="${meal.strMealThumb}"/>
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} <span>Dish</span></p>
    <p> Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipediv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipepopup(meal);
        })
        recipecontainer.appendChild(recipediv);
    });
    
        
    } catch (error) {
        recipecontainer.innerHTML=`<h2>Error in fetching recipes...</h2>`
    }
}
 
const fetchIngredients=(meal)=>{
let ingredientList='';
for(let i=1;i<=20;i++){
    const ingredient=meal[`strIngredient${i}`];
    if(ingredient){
        const measure=meal[`strMeasure${i}`];
        ingredientList += `<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}
return ingredientList;
}


const openRecipepopup=(meal)=>{
recipeDetailsContent.innerHTML=`
<h2 class="recipeName"> ${meal.strMeal}</h2>
<h3>Ingredents:</h3>
<ul class="IngredientList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
<h3>Instruction:</h3>
<p >${meal.strInstructions}</p>
</div>
`

recipeDetailsContent.parentElement.style.display="block";
}


recipeClosebtn.addEventListener('click',()=>{
recipeDetailsContent.parentElement.style.display="none";


});
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchbox.value.trim();
    if(!searchInput){
        recipecontainer.innerHTML=`<h2>Type the meal in the search box..</h2>`;
        return;
    }
fetchRecipes(searchInput);
});

