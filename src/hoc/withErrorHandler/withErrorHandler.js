import React, { Component } from 'react';
import Aux from "../Auxilary";
import Modal from "../../components/UI/Modal/Modal";
import fetchIntercept from 'fetch-intercept';

const withErrorHandler=(WrappedComponent)=>{
    
    return class extends Component{
        state={
            error:null,
        }

        componentDidMount=()=>{
            const unregister = fetchIntercept.register({
                request:(url, config)=> {
                    this.setState({error:null})
                    // Modify the url or config here
                    if(config && config.method==="POST"){
                        config.headers={'Content-Type':'application/json'}
                    }
                    return [url, config];
                },
                responseError: (error)=> {
                    // Handle an fetch error
                    this.setState({error:error})
                    return Promise.reject(error);
                }
            });
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null})
        }
        
        
        render(){
           return  (
                <Aux>
                    <Modal show={this.state.error} clicked={this.errorConfirmedHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
    
    
   
}

export default withErrorHandler;