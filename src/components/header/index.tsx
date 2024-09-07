import { Link } from "react-router-dom";
import { GiBowTieRibbon } from "react-icons/gi";
import { RiHeartPulseLine } from "react-icons/ri";

function Header() {
  return (
    <div className="h-1/5 flex justify-between items-center">
      <Link to="/">
        <h1
          className="text-white text-3xl flex items-center gap-1 sm:text-5xl"
          id="header"
        >
          MemoryTies
          <GiBowTieRibbon size={25} className="-rotate-45" />
        </h1>
      </Link>

      <Link to="/line" className="bg-white rounded-full flex justify-center items-center p-1">
        <RiHeartPulseLine size={40} color="red"/>
      </Link>
    </div>
  );
}

export default Header;
