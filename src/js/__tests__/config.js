const { config } = require("..");

describe("Config", () => {
  test("Should create config", () => {
    const cfg = config.create("demo");
    expect(cfg.name).toBe("demo");
  });

  test("Should be able add steps", () => {
    const cfg = config.create("demo");

    cfg.addStep("step-1", jest.fn());
    cfg.addStep("step-2", jest.fn());
    expect(cfg.steps.length).toBe(2);
  });

  test("Should apply steps in order they were added", async () => {
    const cfg = config.create("demo");

    let blocked = false;
    const handler1 = jest.fn(() => {
      if (blocked) {
        throw new Error("Unsync");
      }
    });
    const handler2 = jest.fn(() => {
      blocked = true;
    });

    cfg.addStep("step-1", handler1);
    cfg.addStep("step-2", handler2);

    await cfg.apply();
    expect(handler1).toBeCalled();
    expect(handler2).toBeCalled();
  });

  test("Should log whats happening", async () => {
    const cfg = config.create("demo");
    cfg.addStep("step-1", jest.fn());
    cfg.addStep("step-2", jest.fn());

    const logger = {
      logs: [],
      log(message) {
        this.logs.push(message);
      },
    };

    await cfg.apply(logger);

    expect(logger.logs).toEqual([
      "Running demo::step-1...",
      "Finished demo::step-1. Status: OK",
      "Running demo::step-2...",
      "Finished demo::step-2. Status: OK",
    ]);
  });
});
