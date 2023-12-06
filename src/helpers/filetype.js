import { fileTypeFromBuffer, fileTypeFromFile } from "file-type";
import { readFileSync } from "fs";

export async function fileType(file) {
	const buffer = readFileSync(file);
	const _type = await fileTypeFromBuffer(buffer);
	return {
		length: buffer.length,
		buffer,
		..._type,
	};
}

export async function is_supported(file) {
	const spp = ["image", "audio", "video"];
	const { mime } = await fileTypeFromFile(file);
	return mime.includes(spp);
}
