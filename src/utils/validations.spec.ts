import { isValidString, isValidJSON } from "./validations";

describe("isValidString", () => {
  it(`should validate string with regular chars to true`, () => {
    expect(isValidString("random name").isValid).toStrictEqual(true);
  });

  it(`should validate string with valid special chars to true`, () => {
    expect(isValidString("name-with_special.chars").isValid).toStrictEqual(
      true
    );
  });

  it(`should validate string with invalid chars to false`, () => {
    expect(isValidString("invalid?name!").isValid).toStrictEqual(false);
  });

  it(`should validate empty string to false`, () => {
    expect(isValidString("").isValid).toStrictEqual(false);
  });
});

describe("isValidJSON", () => {
  it(`should validate correctly formatted json to true`, () => {
    expect(isValidJSON("{}").isValid).toStrictEqual(true);
  });

  it(`should validate another correctly formatted json to true`, () => {
    expect(isValidJSON(`{"key": "value"}`).isValid).toStrictEqual(true);
  });

  it(`should validate incorrectly formatted json to false`, () => {
    expect(isValidJSON("{asd123}").isValid).toStrictEqual(false);
  });
});
