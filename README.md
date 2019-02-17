# react-create-context-provider

Create a React Context Provider component that allows updating Context value with Consumer or useContext.

## Install

```
$ npm install --save react-create-context-provider
```

## Usage

``` javascript
import React from "react";
import ReactDOM from "react-dom";
import createContextProvider from "react-create-context-provider";

let [AppContext, AppContextProvider] = createContextProvider({theme: "light"});

function DarkThemeButton() {
  let {setTheme} = React.useContext(AppContext);
  return <button onClick={() => setTheme("dark")}>Use Dark Theme</button>;
}

function App() {
  let {theme} = React.useContext(AppContext);
  return <div className="app">
    <h1>Theme: {theme}</h1>
    <DarkThemeButton/>
  </div>;
}

ReactDOM.render(
  <AppContextProvider>
    <App/>
  </AppContextProvider>
, document.body.getElementById("app"));
```

## License

[MIT License](./LICENSE)
