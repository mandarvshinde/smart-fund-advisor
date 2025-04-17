
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, MessageSquare, MessagesSquare, Discord, Reddit } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex space-x-3 mb-2">
        <Link to="#" className="text-white hover:text-[#9b87f5] transition-colors">
          <Facebook size={20} />
        </Link>
        <Link to="#" className="text-white hover:text-[#9b87f5] transition-colors">
          <Instagram size={20} />
        </Link>
        <Link to="#" className="text-white hover:text-[#9b87f5] transition-colors">
          <Twitter size={20} />
        </Link>
        <Link to="#" className="text-white hover:text-[#9b87f5] transition-colors">
          <Youtube size={20} />
        </Link>
        <Link to="#" className="text-white hover:text-[#9b87f5] transition-colors">
          <Linkedin size={20} />
        </Link>
        <Link to="#" className="text-white hover:text-[#9b87f5] transition-colors">
          <Reddit size={20} />
        </Link>
        <Link to="#" className="text-white hover:text-[#9b87f5] transition-colors">
          <Discord size={20} />
        </Link>
      </div>
      
      <Link to="/" className="text-center">
        <h1 className="text-3xl font-bold text-[#9b87f5]">Kuberiti</h1>
        <p className="text-sm text-white mt-1">The Algorithm of Prosperity.</p>
      </Link>
    </div>
  );
};

export default Logo;
