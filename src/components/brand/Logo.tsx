
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Linkedin, MessageSquareShare, MessagesSquare } from "lucide-react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="flex space-x-3 mb-2">
        <Link to="#" className="text-[#8D6E63] hover:text-[#6D4C41] transition-colors">
          <Facebook size={20} />
        </Link>
        <Link to="#" className="text-[#8D6E63] hover:text-[#6D4C41] transition-colors">
          <Instagram size={20} />
        </Link>
        <Link to="#" className="text-[#8D6E63] hover:text-[#6D4C41] transition-colors">
          <Twitter size={20} />
        </Link>
        <Link to="#" className="text-[#8D6E63] hover:text-[#6D4C41] transition-colors">
          <Youtube size={20} />
        </Link>
        <Link to="#" className="text-[#8D6E63] hover:text-[#6D4C41] transition-colors">
          <Linkedin size={20} />
        </Link>
        <Link to="#" className="text-[#8D6E63] hover:text-[#6D4C41] transition-colors">
          <MessageSquareShare size={20} />
        </Link>
        <Link to="#" className="text-[#8D6E63] hover:text-[#6D4C41] transition-colors">
          <MessagesSquare size={20} />
        </Link>
      </div>
      
      <Link to="/" className="text-center">
        <h1 className="text-3xl font-bold text-[#5D4037]">Kuberiti</h1>
        <p className="text-sm text-[#8D6E63] mt-1">The Algorithm of Prosperity.</p>
      </Link>
    </div>
  );
};

export default Logo;
