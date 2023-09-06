import { PrismaClient } from "@prisma/client"
import AddUser from "./addUser";
const prisma = new PrismaClient()
import DeleteUser from "./deleteUser";
import UpdateUser from "./updateUser";


const getUsers = async () => {
    const res = await prisma.users.findMany({
        select: {
            id: true,
            name: true,
            position: true,
            gender: true,
            email: true
        }
    });
    return res;
}

const User = async () => {

    const users = await getUsers();


    return (
        <div className="m-5">
            <div className="text-center mt-10  text-4xl font-semibold">
                <p>CRUD NEXT_JS</p>
            </div>
            <div className="mb-2">
                <AddUser />
            </div>
            <table className='table w-full'>
                <thead>
                    <tr className="text-center text-lg">
                        <th>No.</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.position}</td>
                            <td>{user.gender}</td>
                            <td>{user.email}</td>
                            <td className="flex justify-center space-x-1 justify-items-center">
                                <UpdateUser user={user} />
                                <DeleteUser user={user} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default User