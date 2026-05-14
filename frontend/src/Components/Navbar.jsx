import { AiOutlineMenuUnfold } from "react-icons/ai";


function Navbar() {
  return (
    <div className="w-full h-16 flex justify-between fixed top-0 z-50 bg-emerald-50 items-center">
      <AiOutlineMenuUnfold className="text-5xl opacity-70 ml-4"/>
      <img
        src="/tplogo.png"
        alt="logo"
        className="min-w-35 h-full mr-4"
      />
    </div>
  );
}

export default Navbar