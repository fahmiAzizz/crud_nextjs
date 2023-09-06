"use client"
import { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


type User = {
    id: number;
    name: string;
    position: string;
    gender: string;
    email: string;
}


const UpdateUser = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState(user.name)
    const [position, setPosition] = useState(user.position)
    const [gender, setGender] = useState(user.gender)
    const [email, setEmail] = useState(user.email)

    const router = useRouter();

    const handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await axios.patch(`/api/users/${user.id}`, {
            name: name,
            position: position,
            gender: gender,
            email: email
        })
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
    };

    const handleModal = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button className="btn btn-info" onClick={handleModal}>Update</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-l">Add New User</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Name</label>
                            <input type="text"
                                className="input input-bordered"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Position</label>
                            <input type="text"
                                className="input input-bordered"
                                placeholder="Position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)} />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Gender</label>
                            <select
                                className="select select-bordered"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}>
                                <option value="" disabled>Choose Your Gender</option>
                                <option value="Pria">Pria</option>
                                <option value="Wanita">Wanita</option>
                            </select>
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Email</label>
                            <input type="email"
                                className="input input-bordered"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            {!isLoading ? (
                                <button type="submit" className="btn btn-primary">Update</button>
                            ) : (
                                <button type="submit" className="btn loading text-primary">
                                    Updating..
                                </button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser