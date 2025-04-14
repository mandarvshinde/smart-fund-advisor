
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      <div className="flex items-center justify-center">
        <img 
          src="/lovable-uploads/51289d21-30ea-4bc6-bc74-ca4b8c933683.png" 
          alt="Kuberiti Logo" 
          className="h-20 w-auto" 
        />
      </div>
    </Link>
  );
};

export default Logo;
