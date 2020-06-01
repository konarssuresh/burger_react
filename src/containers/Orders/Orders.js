import React,{Component} from 'react';
import classes from "./Orders.css";
import Order from "../../components/Order/Order";
import * as actions from "../../store/actions/index";
import {connect} from 'react-redux';
import Spinner from "../../components/UI/Spinner/Spinner"
class  Orders extends Component{

    componentDidMount(){
       this.props.onFetchOrders(this.props.token,this.props.userId);
    }
    render(){
        let orders=<Spinner/>
        if(!this.props.loading){
            orders=this.props.orders.map(order=>(
                <Order key={order.id}
                price={order.totalPrice} 
                ingredients={order.ingredients}/>
            ))
        }

        return(
            <div className={classes.Orders}>
                {orders}   
            </div>
        )
    }
}

const mapStatetoProps=(state)=>{
    return {
        orders:state.ord.orders,
        loading:state.ord.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onFetchOrders:(token,userId)=>dispatch(actions.fetchOrderStart(token,userId))
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(Orders);