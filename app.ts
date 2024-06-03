import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import globalErrorhandler from "./src/app/middlwares/globalErrorhandler";
import notFound from "./src/app/middlwares/notFound";
import router from "./src/app/routes";

//parsers:
app.use(express.json());
app.use(cors());

app.use("/api/v1",router );



const test = async(req:Request, res: Response)=> {
Promise.reject()
}

app.get('/', test)





app.use(globalErrorhandler);
app.use(notFound);

export default app;
