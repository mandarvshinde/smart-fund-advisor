
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link to="/" className={`inline-block ${className}`}>
      <div className="flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-finance-primary">
          <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path>
          <path d="m13 13 6 6"></path>
        </svg>
        <h1 className="ml-2 text-2xl font-bold text-finance-primary">SmartFund</h1>
      </div>
    </Link>
  );
};

export default Logo;
