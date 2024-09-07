import { Link } from "react-router-dom";
import { GiBowTieRibbon } from "react-icons/gi";

function Header() {
  return (
    <>
      <Link to="/">
        <h1
          className="text-white text-4xl h-1/5 flex items-center gap-1 sm:text-5xl"
          id="header"
        >
          MemoryTies
          <GiBowTieRibbon size={25} className="-rotate-45" />
        </h1>
      </Link>
    </>
  );
}

export default Header;
