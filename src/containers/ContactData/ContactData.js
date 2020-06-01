import React,{Component} from 'react';
import Button from "../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input  from "../../components/UI/Input/input";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";
import { Redirect } from 'react-router';
class ContactData extends Component{
    state={
       orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            pinCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Pincode'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Email'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:"Fastest"},
                        {value:"cheapest",displayValue:"Cheapest"}
                    ]
                },
                value:'fastest',
                valid:true
            }
        },
        formIsValid:false
       }


    orderHandler=(event)=>{
        event.preventDefault();
        const ing=this.props.ingredients;
        const price=this.props.price;
        const formData={}

        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
       const order={
                ingredients:ing,
                totalPrice:price,
                orderData:formData,
                userId:this.props.userId
        }
        this.props.onPurchaseStart(order,this.props.token);
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

        return isValid;
    }

    checkFormValidity(updatedOrderForm){
        let formValid=true;

        for(let key in updatedOrderForm ){
            formValid = updatedOrderForm[key].valid && formValid; 
        }

        return formValid

    }

    inputChangedHandler=(event,inputIdentifier)=>{
        const updatedOrderForm={...this.state.orderForm};
        const updatedFormElement={...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value=event.target.value;
        if(updatedFormElement.validation){
            updatedFormElement.valid=this.checkValidity(event.target.value,updatedFormElement.validation);
            updatedFormElement.touched=true;
        }
        updatedOrderForm[inputIdentifier]=updatedFormElement;
        let formValid=true;

        for(let key in updatedOrderForm ){
            formValid = updatedOrderForm[key].valid && formValid; 
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formValid})
    }

    render(){
        
        const formElementArray=[]
        for (let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=(
            <form onSubmit={this.orderHandler}>
                {
                    formElementArray.map(element=>(
                        <Input key={element.id} elementType={element.config.elementType} 
                        elementConfig={element.config.elementConfig} 
                        value={element.config.value}
                        invalid={!element.config.valid}
                        touched={element.config.touched}
                        shouldValidate={element.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,element.id)}/>
                    ))
                }
               
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button> 
            </form>
        );


        if(this.props.loading){
            form=(<Spinner/> )
        }
        
        if(this.props.purchased){
            form=<Redirect to="/"/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Entry for contact data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        ingredients:state.brg.ingredients,
        price:state.brg.totalPrice,
        loading:state.ord.loading,
        purchased:state.ord.purchased,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onPurchaseStart:(orderData,token)=>dispatch(actions.startPurchaseBurger(orderData,token)),
        onPurchaseInit:()=>dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);