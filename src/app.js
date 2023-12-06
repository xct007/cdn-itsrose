import Express from "express";

import middlewares, { errorHandler, notFound } from "./middlewares.js";
import uploader from "./routers/uploader.js";
import file from "./routers/file.js";

const app = new Express();

app.use(middlewares);

app.get("/", (req, res) => {
	res.json({
		status: true,
		code: 200,
		message: "Hello World!",
	});
});
app.use("/uploader", uploader);
app.use("/file", file);
app.use(notFound);
app.use(errorHandler);

export default app;
