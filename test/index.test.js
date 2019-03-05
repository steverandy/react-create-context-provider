import "@babel/polyfill";
import React from "react";
import {render, fireEvent, cleanup, waitForElement} from "react-testing-library";
import createContextProvider from "./../src/index";

afterEach(cleanup);

describe("index", () => {
  test("createContext", () => {
    let [Context, ContextProvider] = createContextProvider({theme: "light"});
    expect(Context).toBeDefined();
    expect(ContextProvider).toBeDefined();
  });

  test("useContext", async () => {
    let [AppContext, AppContextProvider] = createContextProvider({
      user: null, theme: "light"
    });
    expect(AppContext).toBeDefined();
    expect(AppContextProvider).toBeDefined();

    function DarkThemeButton() {
      let {setTheme} = React.useContext(AppContext);
      return <button onClick={() => setTheme("dark")}>Use Dark Theme</button>;
    }

    function App() {
      let {theme, user, setUser} = React.useContext(AppContext);
      React.useEffect(() => setUser("admin"), []);
      return <div className="app">
        <h1>User: {user}</h1>
        <h2>Theme: {theme}</h2>
        <DarkThemeButton/>
      </div>;
    }

    let app = <AppContextProvider><App/></AppContextProvider>;
    let {getByText} = render(app);

    expect(getByText(/User:/).textContent).toContain("admin");
    expect(getByText(/Theme:/).textContent).toContain("light");
    fireEvent.click(getByText("Use Dark Theme"));
    expect(getByText(/User:/).textContent).toContain("admin");
    let theme = await waitForElement(() => getByText(/Theme:/));
    expect(theme.textContent).toContain("dark");
  });
});
