import Bootstrapper from "./Bootstrapper";
import DBClient from "./DBClient";

const dbClient = new DBClient(process.env.DB_URL!);

export { dbClient, Bootstrapper };