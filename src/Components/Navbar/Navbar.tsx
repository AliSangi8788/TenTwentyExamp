import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white h-[101px] px-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-x-6">
          <div className="font-wroksans text-sm font-normal text-black leading-[140%] tracking-normal">
            <Link to="/">About</Link>
          </div>
          <div className="font-wroksans text-sm font-normal text-black leading-[140%] tracking-normal">
            <Link to="/">News</Link>
          </div>
          <div className="font-wroksans text-sm font-normal text-black leading-[140%] tracking-normal">
            <Link to="/">Services</Link>
          </div>
          <div className="font-wroksans text-sm font-normal text-black leading-[140%] tracking-normal">
            <Link to="/">Our Team</Link>
          </div>
          <div className="font-wroksans text-sm font-normal text-black leading-[140%] tracking-normal">
            <Link to="/">Make Enquiry</Link>
          </div>
        </div>
        <div>
          <button className="flex items-center gap-x-4 border border-black font-wroksans px-3 py-1.5">
            Contact us
            <img src="/Images/shape.svg" alt="icon" width={18} height={14} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
