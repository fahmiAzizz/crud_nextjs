export const metadata = {
    title: "User",
};

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="px-10 py-10">{children}</div>
    )
}

export default UserLayout