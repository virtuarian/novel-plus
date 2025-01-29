import { getMysqlConnection } from "@/lib/mysql";
import type { LoginUser } from "@/types/LoginUser";

export const authenticateUser = async (userName: string, password: string): Promise<LoginUser | null> => {
    const id = userName;
    const pass = password;

    try {
        //DB接続情報
        const connection = await getMysqlConnection();

        //SQL実行
        console.log("user: ", id, " pass: ", pass);

        const sql = 'select * from login where enable_flg = "1" and user_id = ? and pass_word = md5(?)';
        const results = await connection.query(sql, [id, pass]);
        connection.end();

        console.log(results);

        //ユーザ情報を設定
        if (results[0].length > 0) {
            const data = JSON.parse(JSON.stringify(results[0]));

            // console.log(data);

            return {
                userId: data[0].user_id,
                userName: data[0].user_name,
                firstLogin: data[0].first_login_flg,
                authority: data[0].authority_flg,
                passwordChange: data[0].pass_word_change_flg,
                enable: data[0].enable_flg,
            };
        }
        // biome-ignore lint/style/noUselessElse: <explanation>
        else {
            return null;
        }
    } catch (e) {
        console.log(e);
        return null;
    }

    //    return new Response("Missing messages", { status: 400 });
    //return NextResponse.json(result);
};
