import * as actionTypes from "../actions/actionTypes";



export const purchaseBurgerSuccess=(id,orderData)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error)=>{
    return {
        type:actionTypes.PURCHASE_BURGER_FAILURE,
        error:error
    }
}

export const purchaseInit = ()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}


export const startPurchaseBurger=(orderData,token,userId)=>{
   return async (dispatch)=>{
    try{
        const url=`https://phonebook-suresh-angular.firebaseio.com/orders.json?auth=${token}`
        const response = await fetch(url,{
            method:"POST",
            body:JSON.stringify(orderData)
        });
        const orderSummary= await response.json();
        dispatch(purchaseBurgerSuccess(orderSummary.name,orderData))
    }catch(err){
        dispatch(purchaseBurgerFail(err))
    }
    }
}

export const fetchOrdersSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOrders=(orders)=>{
    return {
        type:actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrderStart=(token,userId)=>{
    return async(dispatch)=>{
        try{        
            dispatch({type:actionTypes.FETCH_ORDER_START});
            const url=`https://phonebook-suresh-angular.firebaseio.com/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`

            const response=await fetch(url);
            const ordersObj=await response.json();
            const orders=[];
            for (let key in ordersObj){
                orders.push({
                    ...ordersObj[key],id:key});
            }
            dispatch({type:actionTypes.FETCH_ORDER_SUCCESS,orders:orders})
        }catch(err){
            dispatch({type:actionTypes.FETCH_ORDER_FAIL,error:err})
        }
    }
}