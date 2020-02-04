import { DEFAULT_OPTIONS } from "../defaults";
import * as utils from "../utils";
import { createRef } from "react";

describe("utils tests", () => {

	describe("getMandatoryOptions tests", () => {

		it("should use all defaults", () => {
			const result = utils.getMandatoryOptions({});

			expect(result).toEqual(DEFAULT_OPTIONS);
		});

		it("should use overrides", () => {
			const options = {
				chunked: false,
				chunkSize: 1000,
				retry: 2,
				parallel: 3
			};

			const result = utils.getMandatoryOptions(options);

			expect(result).toEqual(options);
		});
	});

	describe("isChunkingSupported tests", () => {
		let orgBlob;

		beforeEach(() => {
			orgBlob = window.Blob;
		});

		afterEach(() => {
			window.Blob = orgBlob;
			utils.isChunkingSupported();
		});

		it("should return true", () => {
			expect(utils.isChunkingSupported()).toBe(true);
		});

		it("should return true for webkitSlice", () => {
			window.Blob = {
				prototype: {webkitSlice: true}
			};
			expect(utils.isChunkingSupported()).toBe(true);

		});

		it("should return true for mozSlice", () => {
			window.Blob = {
				prototype: {
					mozSlice: true
				}
			};

			expect(utils.isChunkingSupported()).toBe(true);
		});

		it("should return false if no blob slice method", () => {
			window.Blob = {
				prototype: {}
			};
			expect(utils.isChunkingSupported()).toBe(false);
		});

		it("should ", () => {
			// noinspection JSAnnotator
			delete window.Blob;
			expect(utils.isChunkingSupported()).toBe(false);
		});
	});

	describe("getChunkDataFromFile tests", () => {

		it("should return chunk", () => {
			const result = utils.getChunkDataFromFile(new Blob([1, 2, 3, 5, 6, 7, 8]), 0, 2);
			expect(result).toBeInstanceOf(Blob);
			expect(result.size).toBe(2);
		});
	});
});