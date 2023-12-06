import "dotenv/config";
import app from "./src/app.js";
import { cleaner } from "./src/cleaner.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
	process.env.CLEANUP_FILES && cleaner();
});
