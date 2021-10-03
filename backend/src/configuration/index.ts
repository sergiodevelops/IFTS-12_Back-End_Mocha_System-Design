import { Sequelize } from "sequelize";

type CONNECTION_OPTIONS = "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | undefined;

const DB_CONNECTION: CONNECTION_OPTIONS = process.env.DB_CONNECTION === "mysql" ? "mysql" : undefined;
const DB_HOST: string = process.env.DB_HOST || "";
const DB_PORT: string = process.env.DB_PORT || "";
const DB_DATABASE: string = process.env.DB_DATABASE || "";
const DB_USERNAME: string = process.env.DB_USERNAME || "";
const DB_PASSWORD: string = process.env.DB_PASSWORD || "";

const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DB_CONNECTION
});

try {
    sequelize.authenticate();
    console.info(`Connection has been established successfully to database ${DB_DATABASE}`);

} catch (error) {
    console.error(`errors: ' ${error}`);
    throw Error(error);
}

export default sequelize;
