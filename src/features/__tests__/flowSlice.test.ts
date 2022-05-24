import { flowReducer } from "..";

describe("Flow Reducer", () => {
  it("Should initialze state", () => {
    expect(flowReducer(undefined, { type: "@@INIT" })).not.toBeNull();
  });
});
