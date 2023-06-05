export default function UserProfile({ user }) {
    return (
        <div className="">
            <img src={user.photoURL} alt="" />
            <p>
                <i>@{user.username}</i>
            </p>
            <h1>{user.displayname || "Anonymous User"}</h1>
        </div>
    );
}
