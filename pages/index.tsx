import { GetServerSideProps } from "next";
import Loader from "../components/Loader";
import PostFeed from "@/components/PostFeed";

import toast from "react-hot-toast";
import { firestore, postToJSON, JSONToPost } from "../lib/firebase";
import {
    collectionGroup,
    doc,
    getDocs,
    setDoc,
    collection,
    addDoc,
    DocumentData,
} from "firebase/firestore";

export const getServerSideProps: GetServerSideProps = async () => {
    let posts: DocumentData[] = [];
    let postsQuery = collectionGroup(firestore, "posts");
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

async function addData() {
    let fake_id = Math.floor(Math.random() * 100);
    let fake_data = {
        username: "blaze",
        slug: `this-is-a-slug-${fake_id}`,
        content: "yuhhhhhhhhhhhhh",
        published: false,
        uid: "423432423",
        "heart count": 0,
    };
    let formated_fake_data = JSONToPost(fake_data);
    await setDoc(
        doc(firestore, `/users/PrP6xeM8tUhcxBLeoCb5rIfeEkH3/posts/${fake_id}`),
        formated_fake_data
    );
}

export default function Home({ posts }) {
    return (
        <main className="flex flex-col text-center justify-center px-32 mt-10 gap-10 pt-10">
            <h1 className="pt-10">sup gamer</h1>
            <Loader show={true} />
            <button onClick={() => toast.success("Yessirrr")}>Toast</button>
            <PostFeed posts={posts} admin={false} />
            {/* <button
                className="bg-white text-black font-semibold rounded-md py-0 px-3"
                onClick={addData}
            >
                Add data
            </button> */}
        </main>
    );
}
