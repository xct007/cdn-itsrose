import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { json, raw, text, urlencoded } from "express";

function notFound(req, res, next) {
	const error = new Error(`Not found - ${req.originalUrl}`);
	res.status(404);
	next(error);
}

function errorHandler(error, req, res, next) {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode);
	res.json({
		status: false,
		code: statusCode,
		message: error.message,
		stack: process.env.DEBUG ? error.stack : undefined,
	});
}

const middlewares = [
	cors(),
	helmet(),
	process.env.DEBUG ? morgan("dev") : morgan("common"),
	json({ limit: "20mb" }),
	urlencoded({ extended: true, limit: "20mb" }),
	text({ limit: "20mb" }),
	raw({ limit: "20mb" }),
];

export default middlewares;
export { errorHandler, notFound };
