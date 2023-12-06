import multer from "multer";
import path from "path";
import { randomString, file } from "../src/helpers/utils.js";
import axios from "axios";
import fs from "fs";
const url = "http://localhost:3000/uploader/file";

const file = "./test.jpg";

const formData = new FormData();
const blob = new Blob([fs.readFileSync(file)], { mimetype: "image/jpg" });

formData.append("file", blob);

axios
	.post(url, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	})
	.then((response) => {
		console.log(response.data);
	})
	.catch((error) => {
		console.log(error.response.data);
	});

describe("Uploader", () => {
	it("should upload a file successfully", async () => {
		const mockDestination = jest.fn((req, file, cb) => {
			cb(null, path.resolve("files"));
		});

		const mockFilename = jest.fn((req, file, cb) => {
			cb(null, randomString() + ".file");
		});

		const mockStorage = multer.diskStorage({
			destination: mockDestination,
			filename: mockFilename,
		});

		const mockMulter = multer({ storage: mockStorage });

		const mockPost = jest
			.spyOn(axios, "post")
			.mockResolvedValueOnce({ data: "Upload successful" });

		await mockMulter.single("file")(req, res, next);

		expect(mockDestination).toHaveBeenCalled();
		expect(mockFilename).toHaveBeenCalled();

		expect(mockPost).toHaveBeenCalledWith(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		expect(console.log).toHaveBeenCalledWith("Upload successful");
	});

	it("should handle upload errors", async () => {
		const mockDestination = jest.fn((req, file, cb) => {
			cb(null, path.resolve("files"));
		});

		const mockFilename = jest.fn((req, file, cb) => {
			cb(null, randomString() + ".file");
		});

		const mockStorage = multer.diskStorage({
			destination: mockDestination,
			filename: mockFilename,
		});

		const mockMulter = multer({ storage: mockStorage });

		const mockPost = jest
			.spyOn(axios, "post")
			.mockRejectedValueOnce({ response: { data: "Upload failed" } });

		await mockMulter.single("file")(req, res, next);

		expect(mockDestination).toHaveBeenCalled();
		expect(mockFilename).toHaveBeenCalled();

		expect(mockPost).toHaveBeenCalledWith(url, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		expect(console.log).toHaveBeenCalledWith("Upload failed");
	});
});
