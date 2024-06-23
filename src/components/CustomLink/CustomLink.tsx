import { Link } from "react-router-dom";

import './customLink.css';
import { ReactSVG } from "react";


interface LinkProps {
   to: string;
   className?: string;
   onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
   children?: string;
}

const CustomLink: React.FC<LinkProps> = ({ to, className, onClick, children }) => {
   return (
      <Link
         to={to}
         className={className}
         onClick={(e) => onClick ? onClick(e) : {}}
      >
         {children}
      </Link>
   );
};

export default CustomLink;