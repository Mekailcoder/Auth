import dotenv from "dotenv";
import app from "./src/app.js";
import { connectdB } from "./src/config/database.js";
import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();
connectdB();
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
