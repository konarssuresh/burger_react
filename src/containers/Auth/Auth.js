import React,{Component} from 'react';
import Input from "../../components/UI/Input/input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.css";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import {Redirect} from 'react-router-dom'

class Auth extends Component{

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'your email'
                },
                value:'',
                validation:{
                    required:true,
                    eMail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'your password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:7
                },
                valid:false,
                touched:false
            }
        },
        isSignUp:true
    }

    checkValidity(value,rules){
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!=='' && isValid;
        }

        if(rules.minLength){
            isValid=value.trim().length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid=value.trim().length <= rules.maxLength && isValid;
        }
        if(rules.eMail){
            const pattern=/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
            isValid = pattern.test(value.trim())&&isValid;
        }
        return isValid;
    }

    inputChangedHandler=(event,key)=>{
        const updatedControls={
            ...this.state.controls,
            [key]:{
                ...this.state.controls[key],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[key].validation),
                touched:true
            }
        }
        this.setState({controls:updatedControls})
    }

    loginSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.onStartAuthentication(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);

    }

    switchModeHandler=()=>{
        this.setState(prevState=>{
            return {isSignUp:!prevState.isSignUp}
        })
    }

    render(){
        let form=<Spinner/>
        let errorMessage=null;
        const formElementArray=[]
        for (let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        if(!this.props.loading){
            form= formElementArray.map(element=>(
                <Input key={element.id} elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} 
                value={element.config.value}
                invalid={!element.config.valid}
                touched={element.config.touched}
                shouldValidate={element.config.validation}
                changed={(event)=>this.inputChangedHandler(event,element.id)}/>
            ))
        }
        if(this.props.error){
        errorMessage=<p>{this.props.error.message}</p>
            
        }

        let redirect=null;
        if(this.props.isAuth)
        {
            if(this.props.buildingBurger && this.props.authRedirectPath!=="/")
            {
                redirect= <Redirect to={this.props.authRedirectPath}/>  
                this.props.onSetAuthRedirect();  
         }
           else{
               
            redirect= <Redirect to={this.props.authRedirectPath}/> 
           } 
        }
        return(<div className={classes.Auth}>
            {redirect}
            <form onSubmit={this.loginSubmitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                {errorMessage}
            </form>
            <Button btnType="Danger" clicked={this.switchModeHandler}>Switch to  {this.state.isSignUp?'SIGN IN':'SIGN UP'}</Button>
        </div>)
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onStartAuthentication:(email,passwd,isSignUp)=>dispatch(actions.startAuthentication(email,passwd,isSignUp)),
        onSetAuthRedirect:()=>dispatch(actions.setAuthRedirect('/'))
    }
}

const mapStateToProps=(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !== null,
        authRedirectPath:state.auth.authRedirectPath,
        buildingBurger:state.brg.building
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth)