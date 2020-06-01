import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";


export class BurgerBuilder extends Component{
    state={
        purchasing:false,
    }

    componentDidMount(){
        this.props.onInitIngedients();
    }

    updatePurchaseState=()=>{
        const ingredients={
            ...this.props.ings
        }
        const sum= Object.keys(ingredients)
        .map((key)=>{
            return ingredients[key];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
    }

    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=async ()=>{
        if(this.props.auth){
            this.props.history.push({pathname:'checkout'});
        }else{
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push("/auth");
        }
    }

    render(){
        const disabledInfo={...this.props.ings};

        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key]<=0;
        }

        let orderSummary=(
            <OrderSummary 
            purchaseContinue={this.purchaseContinueHandler} 
            purchaseCancel={this.purchaseCancelHandler} 
            ingredients={this.props.ings}
            price={this.props.price}/>
        )

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings}/>
                <BuildControls 
                disabled={disabledInfo} 
                ingredientAdd={this.props.onAddIngredient} 
                removeIngredient={this.props.onRemoveIngredient}
                isAuthenticated={this.props.auth}
                purchasable={this.updatePurchaseState()}
                price={this.props.price}
                ordered={this.purchaseHandler}/>
            </Aux>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        ings:state.brg.ingredients,
        price:state.brg.totalPrice,
        building:state.brg.building,
        auth:state.auth.token!== null
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onAddIngredient:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onRemoveIngredient:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngedients:()=>dispatch(actions.initIngredients()),
        onSetAuthRedirect:(path)=>dispatch(actions.setAuthRedirect(path))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder)