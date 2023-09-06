"use client"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

type User = {
    id: number;
    name: string;
    position: string;
    gender: string;
    email: string;
}

const DeleteUser = ({ user }: { user: User }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const router = useRouter();

    const handleDelete = async (id: number) => {
        setIsLoading(true);
        await axios.delete(`/api/users/${id}`);
        setIsLoading(false);
        router.refresh();
        setIsOpen(false);
    }

    const handleModal = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div>
            <button className="btn btn-error btn-small" onClick={handleModal}>Delete</button>
            <div className={isOpen ? "modal modal-open" : "modal"}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">
                        Are sure to delete {user.name}?
                    </h3>

                    <div className="modal-action">
                        <button type="button" className="btn" onClick={handleModal}>
                            No
                        </button>
                        {!isLoading ? (
                            <button
                                type="button"
                                onClick={() => handleDelete(user.id)}
                                className="btn btn-primary"
                            >
                                Yes
                            </button>
                        ) : (
                            <button type="button" className="btn loading">
                                Deleting...
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteUser