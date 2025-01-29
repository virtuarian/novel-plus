//import * as mysql from 'promise-mysql';
import * as mysql from 'mysql2/promise';

//MySQL接続情報の取得
export const getMysqlConnection = async () => {

    let mysqlConnection = null;

    // console.log("DB Connection");
    // const mysqlConnection = await mysql.createPool(connectionPool);

    //SSL接続
    if (process.env.MYSQL_SSL === "true") {
        //DB接続
        mysqlConnection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            ssl: {
                rejectUnauthorized: false,
                ca: process.env.MYSQL_CA_FILE, // CA 証明書のパス

            },
        });
    }
    else {
        //DB接続
        mysqlConnection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
    }

    return mysqlConnection;
}

const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
})