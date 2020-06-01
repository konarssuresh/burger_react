import React from 'react';
import NavigationItems from "./NavigationItems"
import Adapter from  'enzyme-adapter-react-16';
import {configure,shallow} from 'enzyme';
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter:new Adapter()})

describe('<NavigationItems/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>);
    })
    it('Should contain 2 NavigationItem when not authenticated',()=>{

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })
    it('Should contain 3 NavigationItem when not authenticated',()=>{
        wrapper.setProps({authenticated:true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('should contain logout navigation item when authenticated',()=>{
        wrapper.setProps({authenticated:true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    })

})