import { GetServerSideProps } from "next";
import Loader from "../components/Loader";
import PostFeed from "@/components/PostFeed";

import toast from "react-hot-toast";
import { firestore, postToJSON, JSONToPost, fromMillis } from "../lib/firebase";
import {
    collectionGroup,
    doc,
    getDocs,
    setDoc,
    query,
    DocumentData,
    limit,
    orderBy,
    startAfter,
} from "firebase/firestore";
import { useState } from "react";

const LIMIT = 3;

export const getServerSideProps: GetServerSideProps = async () => {
    let posts: DocumentData[] = [];
    let postsQuery = query(
        collectionGroup(firestore, "posts"),
        orderBy("createdAt", "desc"),
        limit(LIMIT)
    );
    const querySnapshot = await getDocs(postsQuery);
    querySnapshot.forEach((doc) => {
        let json_post = postToJSON(doc);
        posts.push(json_post);
    });

    return {
        props: {
            posts: posts,
        },
    };
};

// async function addData() {
//     let fake_id = Math.floor(Math.random() * 100);
//     let fake_data = {
//         username: "blaze",
//         slug: `this-is-a-slug-${fake_id}`,
//         content: "yuhhhhhhhhhhhhh",
//         published: false,
//         uid: "423432423",
//         "heart count": 0,
//     };
//     let formated_fake_data = JSONToPost(fake_data);
//     await setDoc(
//         doc(firestore, `/users/PrP6xeM8tUhcxBLeoCb5rIfeEkH3/posts/${fake_id}`),
//         formated_fake_data
//     );
// }

export default function Home(props) {
    const [posts, setPosts] = useState(props.posts);
    const [loading, setLoading] = useState(false);
    const [postsEnd, setPostsEnd] = useState(false);

    const getMorePosts = async () => {
        setLoading(true);
        const last = posts[posts.length - 1];
        let newPosts: DocumentData[] = [];

        const cursor =
            typeof last.createdAt === "number"
                ? fromMillis(last.createdAt)
                : last.createdAt;

        let postsQuery = query(
            collectionGroup(firestore, "posts"),
            orderBy("createdAt", "desc"),
            startAfter(cursor),
            limit(LIMIT)
        );

        const querySnapshot = await getDocs(postsQuery);
        querySnapshot.forEach((doc) => {
            let json_post = postToJSON(doc);
            newPosts.push(json_post);
        });

        setPosts(posts.concat(newPosts));
        setLoading(false);

        if (newPosts.length < LIMIT) {
            setPostsEnd(true);
        }
    };

    return (
        <main className="flex flex-col text-center justify-center px-32 mt-10 gap-10 pt-10 pb-10">
            <PostFeed posts={posts} admin={false} />
            {!loading && !postsEnd && (
                <button onClick={getMorePosts}>Load more</button>
            )}
            <div className="flex w-full justify-center">
                <Loader show={loading} />
            </div>
            {postsEnd && "You have reached the end!"}

            {/* <button
                className="bg-white text-black font-semibold rounded-md py-0 px-3"
                onClick={addData}
            >
                Add data
            </button> */}
        </main>
    );
}
