import React from 'react';
import logo from './FineTime.png'; 

console.log(logo); 

function Logo() {
    return <img src={logo} style={{width: '350px', alignItems: 'center'}} alt="Logo" />;
}
// Logo for the home page
export default Logo;