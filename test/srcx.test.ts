import { srcx } from "..";

describe("srcx", () => {
	it("returns correct src and srcSet for absolute url", () => {
		expect(srcx("http://www.google.com/google.jpg"))
			.toEqual({
				src: "http://www.google.com/google.jpg",
				srcSet: "http://www.google.com/google@2x.jpg 2x,http://www.google.com/google@3x.jpg 3x"
			});
	});

	it("returns correct src and srcSet for png", () => {
		expect(srcx("/foo/bar.png"))
			.toEqual({
				src: "/foo/bar.png",
				srcSet: "/foo/bar@2x.png 2x,/foo/bar@3x.png 3x"
			});
	});

	it("returns correct src and srcSet for svg", () => {
		expect(srcx("/foo/bar.svg"))
			.toEqual({
				src: "/foo/bar.svg"
			});
	});

	it("returns correct src and srcSet for png with custom scales", () => {
		expect(srcx("/foo/bar.png", { scales: [2] }))
			.toEqual({
				src: "/foo/bar.png",
				srcSet: "/foo/bar@2x.png 2x"
			});
	});

	it("returns correct src and srcSet for png with no scales", () => {
		expect(srcx("/foo/bar.png", { scales: [] }))
			.toEqual({
				src: "/foo/bar.png"
			});
	});

	it("returns correct src and srcSet for svg with custom scales", () => {
		expect(srcx("/foo/bar.svg", { scales: [2] }))
			.toEqual({
				src: "/foo/bar.svg"
			});
	});

	it("returns correct src and srcSet for png with forced 2x scale", () => {
		expect(srcx("/foo/bar.png", { forceScale: 2 }))
			.toEqual({
				src: "/foo/bar@2x.png",
				srcSet: "/foo/bar@3x.png 3x"
			});
	});

	it("returns correct src and srcSet for png with forced 3x scale", () => {
		expect(srcx("/foo/bar.png", { forceScale: 3 }))
			.toEqual({
				src: "/foo/bar@3x.png"
			});
	});

	it("returns correct src and srcSet for svg with forced scale", () => {
		expect(srcx("/foo/bar.svg", { forceScale: 2 }))
			.toEqual({
				src: "/foo/bar.svg"
			});
	});
});
