import Adapter from 'enzyme-adapter-react-16';
import {configure,shallow} from 'enzyme';
import React from 'react';
import {BurgerBuilder} from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({adapter:new Adapter()});

describe('<BurgerBuilder/> container',()=>{

    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder onInitIngedients={()=>{}}/>);
    })

    it('should render build controls when containing ingredients',()=>{
        wrapper.setProps({ings:{salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })

})