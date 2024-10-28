export function createSegments(path: string) {
	const [, ...segments] = path.split("/");
	segments.pop();
	return segments.map((s) => ({
		name: s,
		path: "/" + segments.slice(0, segments.indexOf(s) + 1).join("/"),
	}));
}
