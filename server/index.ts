import cors from "cors";
import express from "express";

// import useragent from "express-useragent";
import helmet from "helmet";
// import { configs, prisma } from "./configs";
import { ListenerPlugin, RouterPlugin } from "./plugins";

const app = express();

app
  .use(helmet())
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }));
// .use(useragent.express());

RouterPlugin.setup(app);
ListenerPlugin.listen(app);
