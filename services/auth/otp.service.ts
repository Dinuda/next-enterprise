import prisma from "lib/prisma";

/**
 * Creates a new otp
 * @returns {otpCode} A promise that resolves to the created parentUser.
 * @throws {Error} If the user already exists or if there's a problem in creation.
 */

async function createAuthCode(): Promise<string> {
    try {
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        return otpCode;
    } catch (error) {
        return Promise.reject(error);
    }
}

/**
 * Add otp to OTP table
 * @param {userId} userId - userId to be added to OTP table
 * @returns {code} A promise that resolves to the created OTP
 */
async function create(userId: string): Promise<{ code: string }> {
    try {
        const code = await createAuthCode();
        const updatedAt = new Date();
        const expiresAt = new Date(Date.now() + 600000); // 10 minutes

        const otpExists = await prisma.oTP.findFirst({
            where: {
                userId: userId,
            }
        });

        const data = {
            userId: userId,
            code: code,
            updatedAt: updatedAt,
            expiresAt: expiresAt,
        };

        if (otpExists) {
            await prisma.oTP.update({
                where: {
                    userId: userId,
                },
                data: data,
            });
        } else {
            await prisma.oTP.create({
                data: data,
            });
        }

        return { code: code };
    } catch (error) {
        throw error;
    }
}



const otpService = {
    create
};

export { otpService };
