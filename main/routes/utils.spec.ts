import test from "node:test";
import { createSegments } from "./utils.ts";
import assert from "node:assert";

test("test-segments", (t) => {
	const [complex, complexPath] = createSegments("/complex-1/path-2/here-3");

	assert(complex.path, "/complex-1");
	assert(complex.name, "complex-1");
	assert(complexPath.path, "complex-1/path-2");
	assert(complexPath.name, "path-2");
});
