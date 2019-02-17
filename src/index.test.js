import "@babel/polyfill";
import React from "react";
import {render, fireEvent, cleanup, waitForElement} from "react-testing-library";
import createContextProvider from "./index";

afterEach(cleanup);

describe("index", () => {
  test("createContext", () => {
    let [Context, ContextProvider] = createContextProvider({theme: "light"});
    expect(Context).toBeDefined();
    expect(ContextProvider).toBeDefined();
  });

  test("useContext", async () => {
    let [AppContext, AppContextProvider] = createContextProvider({theme: "light"});
    expect(AppContext).toBeDefined();
    expect(AppContextProvider).toBeDefined();

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

    let app = <AppContextProvider><App/></AppContextProvider>;
    let {getByText} = render(app);

    expect(getByText(/Theme:/).textContent).toContain("light");
    fireEvent.click(getByText("Use Dark Theme"));
    let theme = await waitForElement(() => getByText(/Theme:/));
    expect(theme.textContent).toContain("dark");
  });
});
