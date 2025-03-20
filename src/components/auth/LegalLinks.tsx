
import { Link } from "react-router-dom";

const LegalLinks = () => {
  return (
    <div className="mt-6 text-center text-sm text-gray-600">
      <p>
        By signing up, you agree to our{" "}
        <Link to="/terms" className="font-medium text-finance-primary hover:text-finance-primary/80">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/privacy" className="font-medium text-finance-primary hover:text-finance-primary/80">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};

export default LegalLinks;
