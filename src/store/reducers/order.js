import * as actionTypes from '../actions/actionTypes';

const initialValue={
    orders:[],
    loading:false,
    purchased:false
}

export const reducer=(state=initialValue,action)=>{

    switch(action.type){
        case actionTypes.FETCH_ORDER_START:
            return{
                ...state,
                loading:true,
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                orders:action.orders,
                loading:false
            }

        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased:false,

            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const orderObj={
                ...action.orderData,
                id:action.orderId
            }
            return {
                ...state,
                orders:state.orders.concat(orderObj),
                loading:false,
                purchased:true
            }
        case actionTypes.PURCHASE_BURGER_FAILURE:
            return {
                ...state,
                loading:false
            }
     
        default:
            return state
    }
}

export default reducer