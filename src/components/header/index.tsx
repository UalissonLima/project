import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Link to="/">
        <h1 className="text-white text-4xl h-1/5 pt-10 sm:text-5xl" id="header">MemoryTies</h1>
      </Link>
    </>
  );
}

export default Header;
