import React, { Component } from 'react';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Switch,Route,withRouter,Redirect} from 'react-router-dom';
import Logout from "./containers/Auth/Logout/Logout";
import {connect} from 'react-redux';
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent";

const asyncAuth= asyncComponent(()=>{return import('./containers/Auth/Auth')});
const asyncOrders = asyncComponent(()=>{return import('./containers/Orders/Orders')});
const asyncCheckout = asyncComponent(()=>{return import('./containers/Checkout/Checkout')});
class App extends Component {
  componentDidMount(){
    this.props.onCheckAuth();
  }
  render() {
    let Routes=(<Switch>
                  <Route path="/auth" component={asyncAuth}/>
                  <Route path="/logout" component={Logout}/>
                  <Route path="/" exact component={BurgerBuilder}/>
                  <Redirect to="/"/>
             </Switch>);
      if(this.props.isAuth){
        Routes=( <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/auth" component={asyncAuth}/>
          <Redirect to="/"/>
        </Switch>)
      }
    return (

      <div>
        <Layout>
          {Routes}
        </Layout>
      </div>

    );
  }
}

const mapDispatchToProps=(dispatch)=>{
  return {
    onCheckAuth:()=>dispatch(actions.checkSignup())
  }
}

const mapStateToProps=(state)=>{
  return {
    isAuth:state.auth.token !== null
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
