import { setupReducer } from "..";

describe("Setup Reducer", () => {
  it("Should initialze state", () => {
    expect(setupReducer(undefined, { type: "@@INIT" })).not.toBeNull();
  });
});
