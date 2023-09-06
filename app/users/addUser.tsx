"use client"
import { SyntheticEvent, useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"


const AddUser = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [name, setName] = useState("")
    const [position, setPosition] = useState("")
    const [gender, setGender] = useState("")
    const [email, setEmail] = useState("")

    const router = useRouter();

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setIsLoad(true);
        await axios.post('/api/users', {
            name: name,
            position: position,
            gender: gender,
            email: email
        })
        setName("");
        setPosition("");
        setGender("");
        setEmail("");

        setIsLoad(false);
        router.refresh();
        setIsOpen(false);
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button className="btn" onClick={handleModal}>Add New</button>
            <div className={isOpen ? 'modal modal-open' : 'modal'}>
                <div className="modal-box">
                    <h3 className="font-bold text-l">Add New User</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control w-full">
                            <label className="label font-bold">Name</label>
                            <input type="text"
                                className="input input-bordered"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Position</label>
                            <input type="text"
                                className="input input-bordered"
                                placeholder="Position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                required />
                        </div>
                        <div className="form-control w-full">
                            <label className="label font-bold">Gender</label>
                            <select
                                className="select select-bordered"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                required>
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
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleModal}>Close</button>
                            {!isLoad ? (
                                <button type="submit" className="btn btn-primary">Save</button>
                            ) : (
                                <button type="submit" className="btn loading"></button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser