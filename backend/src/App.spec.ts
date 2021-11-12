import { equal } from "assert";
import App from "./App";

describe("Typescript usage suite", () => {
    it("should be able to execute a test", () => {
        equal(true, true);
    });
    it("should return expected string", () => {
        // equal(App("incoming"), "incoming-static");
    });
});