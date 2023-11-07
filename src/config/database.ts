// models/database.ts
import { Sequelize } from "sequelize";
import config from "./config";

// initialize db
const sequelize = new Sequelize(config.db.postgres.options);
// const sequelize = new Sequelize("postgres://postgres:iremide.nexzy10@localhost/postgres");

export default sequelize;
