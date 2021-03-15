import React, { createContext, useState } from 'react'

export const Context = createContext();

export const NameProvider = props => {
    
    const [names, setname] = useState([
        {
            age : 22,
            day : "lundi"
        },
        {
            age : 30,
            day : "samedi"  
        },
        {
            age : 44,
            day : "dimench"
        }
    ]); 
    return(
        <Context.Provider value={[names, setname]}>
            {props.children}
        </Context.Provider>
    );
}
 