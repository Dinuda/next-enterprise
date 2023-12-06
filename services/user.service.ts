import { UserCreationResponse } from "customTypes/user";
import prisma from "lib/prisma";

/**
 * Creates a new user in the database.
 * @param {UserCreationResponse} user - The user object to be created.
 * @returns {Promise<UserCreationResponse>} A promise that resolves to the created user.
 * @throws {Error} If the user already exists or if there's a problem in creation.
 */
async function create(email: string, phone: string, name: string): Promise<UserCreationResponse> {
    try {
        const existingUsers = await prisma.user.findMany({
            where: {
                email: email,
                phone: phone,
            },
        });

        if (existingUsers.length > 0) {
            return Promise.reject(new Error("User already exists"));
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                phone: phone,
                name: name,
                organization: { connect: { id: "4ce9ef78-a408-43d2-8673-59d90b0e5cea" } },
                accountVerified: false,
            },
            include: {
                organization: true,
            }
        }) as UserCreationResponse;

        return newUser;
    } catch (error) {
        return Promise.reject(error);
    }
}

const userService = {
    create
};

export default userService;