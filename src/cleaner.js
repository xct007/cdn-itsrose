import cron from "node-cron";
import { promises as fs } from "fs";
import { root_dir_files } from "./helpers/utils.js";

// every 1 day
const CRON_SCHEDULE = "0 0 * * *";

const clean = async () => {
	process.env.DEBUG ?? console.debug("cleaner running...");
	const files = await fs.readdir(root_dir_files());
	files.forEach(async (file) => {
		await fs.unlink(`files/${file}`);
		process.env.DEBUG ?? console.debug(`file ${file} deleted`);
	});
};

export const cleaner = () => {
	cron.schedule(CRON_SCHEDULE, clean);
};
