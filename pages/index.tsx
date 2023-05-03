import Loader from "../components/Loader";
import toast from "react-hot-toast";

export default function Home() {
    return (
        <main className="flex gap-10 ">
            
            <h1 className="pt-10">sup gamer</h1>
            <Loader show={true} />
            <button onClick={() => toast.success("Yessirrr")}>Toast</button>
        </main>
    );
}
