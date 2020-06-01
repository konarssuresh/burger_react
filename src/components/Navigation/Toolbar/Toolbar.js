import React from 'react';
import classes from './Toolbar.css';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle authenticated={props.auth} clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
             <Logo>Logo</Logo>
        </div>
        
        <nav className={classes.DesktopOnly}>
            <NavigationItems authenticated={props.auth}/>
        </nav>
    </header>
)


export default toolbar