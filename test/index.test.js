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
      user: null, theme: "light", modalIsOpen: false
    });
    expect(AppContext).toBeDefined();
    expect(AppContextProvider).toBeDefined();

    function DarkThemeButton() {
      let {setTheme} = React.useContext(AppContext);
      function handleClick() {
        setTheme("dark");
      }
      return <button onClick={handleClick}>Use Dark Theme</button>;
    }

    function ToggleModalButton() {
      let {setModalIsOpen} = React.useContext(AppContext);
      function handleClick() {
        setModalIsOpen(modalIsOpen => !modalIsOpen);
      }
      return <button onClick={handleClick}>Toggle Modal</button>;
    }

    function App() {
      let {user, theme, modalIsOpen, setUser} = React.useContext(AppContext);
      React.useEffect(() => setUser("admin"), []);
      return <div className="app">
        <h1>User: {user}</h1>
        <h2>Theme: {theme}</h2>
        <h2>Modal is open: {modalIsOpen.toString()}</h2>
        <DarkThemeButton/>
        <ToggleModalButton/>
      </div>;
    }

    let app = <AppContextProvider><App/></AppContextProvider>;
    let {getByText} = render(app);

    expect(getByText(/User:/).textContent).toContain("admin");
    expect(getByText(/Theme:/).textContent).toContain("light");

    /** Test clicking button to set theme */
    fireEvent.click(getByText("Use Dark Theme"));
    expect(getByText(/User:/).textContent).toContain("admin");
    let theme = await waitForElement(() => getByText(/Theme:/));
    expect(theme.textContent).toContain("dark");

    /** Test clicking button to toggle modal */
    fireEvent.click(getByText("Toggle Modal"));
    let modal = await waitForElement(() => getByText(/Modal is open:/));
    expect(modal.textContent).toContain("true");
  });
});
