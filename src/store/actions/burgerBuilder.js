import * as actionTypes from "./actionTypes";


export const addIngredient = (ingName)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:ingName}
}

export const removeIngredient =(ingName)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:ingName}
}

export const setIngredients=(ings)=>{
    return{
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ings
    }
}

export const initIngredients =()=>{
    return async(dispatch)=>{
        try{
            const response=await fetch("https://phonebook-suresh-angular.firebaseio.com/ingredients.json");
            const result=await response.json();
            dispatch(setIngredients(result))
            return result;
        }catch(error){
            console.log("error in fetching ingredients");
        }
    }
}