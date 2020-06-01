import React,{Component} from 'react';
import Aux from '../../hoc/Auxilary';
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import {connect} from 'react-redux';


class Layout extends Component{

    state={
        showSideDrawer:false
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevstate)=>{
            return {showSideDrawer:!prevstate.showSideDrawer}
        })
    }
    render(){
       return  (
            <Aux>
                <Toolbar auth={this.props.authenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer auth={this.props.authenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps=(state)=>{
    return {
        authenticated:state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout)