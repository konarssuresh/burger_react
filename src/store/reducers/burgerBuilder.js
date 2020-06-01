import * as actionItems from "../actions/actionTypes";

const InitialValue={
    ingredients:{
    },
    totalPrice:0,
    building:false
}

const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:0.7,
    bacon:0.6
}

const reducer=(state=InitialValue,action)=>{
    switch(action.type){
        case actionItems.ADD_INGREDIENT:
            return  {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
        case actionItems.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
        case actionItems.SET_INGREDIENTS:
            return {
                ...state,
                ingredients:action.ingredients,
                totalPrice:0,
                building:false
            }
        default:
            return state
    }
}



export default reducer