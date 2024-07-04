import { Link } from "react-router-dom";
import Animation from "../../Components/Animation/Animation.jsx";
import "./Home.jsx";
export default function Home() {
  return (
    <>
      <Animation />
      <Link to='/profile'>Account</Link>
    </>
  );
}
