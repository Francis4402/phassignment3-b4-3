import express, {Application, NextFunction, Request, Response} from "express";
import cors from 'cors';
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandler";
import notFound from "./app/middlewares/notFound";


const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get("/", (req: Request, res: Response) => {
  res.send("<h3>Batch: Ph Hero Level 2 - batch 4 (WEB8-1601)</h3><h2>Assignment 3</h2><h3>Project: Blog Project</h3>");
});


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  globalErrorHandler(error, req, res, next);
});

//Not Found
app.use((req: Request, res: Response, next: NextFunction) => {
  notFound(req, res, next);
});

export default app;