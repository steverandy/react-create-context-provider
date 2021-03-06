import React from "react";
import {pascalCase} from "./utils";

export default function createContextProvider(defaultValue) {
  let Context = React.createContext(defaultValue);

  function ContextProvider(props) {
    let initialContextValue = {...defaultValue};
    Object.keys(initialContextValue).forEach((key) => {
      if (typeof initialContextValue[key] !== "function") {
        let setKey = `set${pascalCase(key)}`;
        initialContextValue[setKey] = (value) => {
          setContextValue((prevContextValue) => {
            if (typeof value === "function") {
              value = value(prevContextValue[key]);
            }
            return {...prevContextValue, [key]: value};
          });
        };
      }
    });
    let [contextValue, setContextValue] = React.useState(initialContextValue);
    return <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>;
  }

  return [Context, ContextProvider];
}
