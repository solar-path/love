import { db } from "@/database/database.js";
import { userTable } from "@/database/schema/auth.drizzle.js";
import { findRecordByKey } from "@/helper/findRecordByKey.helper.js";

export const register = async (user: { email: string; password: string }) => {
    const record = await findRecordByKey(userTable, 'email', user.email);

    if (record) return {
        data: null,
        success: false,
        message: 'User already exists',
    };

    db.transaction(async (tx) => {
        const verificationToken = crypto.randomUUID();

        await tx.insert(userTable).values({
            id: crypto.randomUUID(),
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
            verificationToken,
        });

        
    })
   

}
