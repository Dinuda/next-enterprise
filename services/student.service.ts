import { StudentUser } from "customTypes/student";
import prisma from "lib/prisma";

/**
 * Creates a new studentUser in the database.
 * @param {name, address, doB, country, parentId} - The studentUser object to be created.
 * @returns {Promise<StudentUser>} A promise that resolves to the created studentUser.
 * @throws {Error} If the user already exists or if there's a problem in creation.
 */
async function create(name: string, address: string, doB: string, country: string, parentId: string): Promise<StudentUser> {
    try {
        const newUser = await prisma.studentUser.create({
            data: {
                name: name,
                address: address,
                doB: doB,
                country: country,   
                userId:  parentId,
            },
            include: {
                user: true,
            }
        }) as StudentUser;

        return newUser;
    } catch (error) {
        return Promise.reject(error);
    }
}


const studentService = {
    create,
};

export default studentService;