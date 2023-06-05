import UserProfile from "@/components/UserProfile";
import PostFeed from "@/components/PostFeed";
import { GetServerSideProps } from "next";
import { getUserFromUsername, getAllPostsOfUser } from "@/lib/firebase";
import { DocumentData } from "firebase/firestore";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { username } = query;
    let user = null;
    let posts = null;
    try {
        const userDoc = await getUserFromUsername(username);
        if (userDoc) {
            user = userDoc.data();
            posts = await getAllPostsOfUser(userDoc.id);
        }
    } catch (error) {
        console.error("Error getting user:", error);
    }

    return { props: { user, posts } };
};

interface IData {
    user: DocumentData;
    posts: DocumentData;
}

export default function UserProfilePage({ user, posts }: IData) {
    return (
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} admin={false} />
        </main>
    );
}