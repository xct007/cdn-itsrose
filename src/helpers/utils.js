import { existsSync, unlinkSync } from "fs";
import { resolve, join } from "path";

export const root_dir_files = (file = false) =>
	file ? join(resolve("files"), file) : resolve("files");

export const isExist = (file) => existsSync(root_dir_files(file));

export const deleteFile = (file) =>
	isExist(file) && unlinkSync(root_dir_files(file));

export const randomString = (length = 14) => {
	const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
	for (let i = length; i > 0; --i) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
};

export const file = (dest) =>
	`${
		(process.env.DOMAIN || "localhost").startsWith("http")
			? process.env.DOMAIN || "localhost"
			: "http://" + (process.env.DOMAIN || "localhost")
	}/file/${
		(process.env.DOMAIN || "localhost").startsWith("/") ? dest.slice(1) : dest
	}`;

export const size_h = (size) =>
	(size / Math.pow(1024, Math.floor(Math.log(size) / Math.log(1024)))).toFixed(
		2
	) *
		1 +
	" " +
	["B", "kB", "MB", "GB", "TB"][Math.floor(Math.log(size) / Math.log(1024))];
