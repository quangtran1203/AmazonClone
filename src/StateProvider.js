//fast snippet for React Context API
import React, { createContext, useContext, useReducer } from "react";
//prepares the data layer
export const StateContext = createContext();
// wrap the entire app and provide the data layer to every component
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);
//pull info from the data layer
export const useStateValue = () => useContext(StateContext);