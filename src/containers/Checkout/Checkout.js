import React,{Component} from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route, Redirect} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends Component{

    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }

    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary =<Redirect to="/"/>

        if(Object.keys(this.props.ingredients).length>0){
            summary=(
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinueHandler}/>
                    <Route path={this.props.match.url+"/contact-data"} 
                    component={ContactData}/>
                </div>)
        }

        return summary;
    }
}

const mapStateToProps=(state)=>{
    return {
        ingredients:state.brg.ingredients
    }
}



export default connect(mapStateToProps)(Checkout)