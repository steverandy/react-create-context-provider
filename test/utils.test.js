import {pascalCase} from "./../src/utils";

describe("utils", () => {
  test("pascalCase", () => {
    expect(pascalCase("variable_name")).toBe("VariableName");
    expect(pascalCase("variable-name")).toBe("VariableName");
    expect(pascalCase("variableName")).toBe("VariableName");
    expect(pascalCase("VariableName")).toBe("VariableName");
  });
});
