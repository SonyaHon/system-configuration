const { os } = require("..").builtin;

describe("Os", () => {
  test("Get current OS", () => {
    // TODO: Add entries for other platforms
    if (process.platform === "darwin") {
      expect(os.getCurrent()).toBe(os.MacOS);
    }
  });
});
