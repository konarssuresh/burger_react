import React from 'react';
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";
const Controls=[
    {label:'Salad',type:"salad"},
    {label:'Bacon',type:"bacon"},
    {label:'Cheese',type:"cheese"},
    {label:'Meat',type:"meat"}
]

const buildControls=(props)=>{

    return(<div className={classes.BuildControls}>
        <h4 style={{textAlign:'center'}}>total price :- {props.price.toFixed(2)}</h4>
        {Controls.map((control)=>(
        <BuildControl 
        key={control.type} 
        label={control.label}
        added={()=>props.ingredientAdd(control.type)}
        removed={()=>props.removeIngredient(control.type)}
        disabled={props.disabled[control.type]}/>
        ))}
        <button className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}> {props.isAuthenticated?'ORDER NOW':'AUTHENTICATE TO ORDER'}</button>
    </div>)
}

export default buildControls;