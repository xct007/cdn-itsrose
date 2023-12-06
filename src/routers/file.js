import { Router } from "express";
import { fileType } from "../helpers/filetype.js";
import { isExist, root_dir_files, deleteFile } from "../helpers/utils.js";

const router = Router();

router.get("/:file", async (req, res, next) => {
	try {
		const { file } = req.params;
		if (!isExist(file)) {
			res.status(404);
			return next(new Error(`file ${file} not found or deleted`));
		}
		const _path = root_dir_files(file);

		const _ext = await fileType(_path);

		res.writeHead(200, {
			"Content-Type": _ext.mime,
			"Content-Length": _ext.length,
		});

		res.write(_ext.buffer);

		res.on("close", () => {
			res.end();
		});

		res.on("error", (error) => {
			next(error);
		});

		res.on("finish", () => {
			if (process.env.DELETE_AFTER_DOWNLOAD === "true") {
				deleteFile(file);
			}
			res.end();
		});
	} catch (error) {
		next(error);
	}
});

export default router;
