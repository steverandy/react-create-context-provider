import {createContext} from "./index";

describe("index", () => {
  test("createContext", () => {
    let [Context, ContextProvider] = createContext({theme: "light"});
    expect(Context).toBeDefined();
    expect(ContextProvider).toBeDefined();
  });
});
