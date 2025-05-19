import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white h-[101px] px-4 md:px-12 flex items-center">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Contact Button (Mobile) */}
        <div className="md:hidden flex-1 flex justify-start">
          <button className="border border-black font-wroksans px-4 py-2 flex items-center gap-x-2 rounded-none w-full max-w-[160px] text-base">
            Contact us <span className="ml-2 text-xl">→</span>
          </button>
        </div>
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 ml-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-6">
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

        {/* Contact Button (Desktop) */}
        <div className="hidden md:block">
          <button className="flex items-center gap-x-4 border border-black font-wroksans px-3 py-1.5">
            Contact us
            <img src="/Images/shape.svg" alt="icon" width={18} height={14} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="absolute top-[101px] left-0 right-0 bg-white shadow-lg md:hidden z-50">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" className="font-wroksans text-sm font-normal text-black">About</Link>
              <Link to="/" className="font-wroksans text-sm font-normal text-black">News</Link>
              <Link to="/" className="font-wroksans text-sm font-normal text-black">Services</Link>
              <Link to="/" className="font-wroksans text-sm font-normal text-black">Our Team</Link>
              <Link to="/" className="font-wroksans text-sm font-normal text-black">Make Enquiry</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
