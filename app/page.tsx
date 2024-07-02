import Loader from "@/components/Loader";
import UserList from "@/components/UserList";
import UserPage from "@/pages/UserPage";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* <Loader /> */}
      <UserPage />
    </div>
  );
}
