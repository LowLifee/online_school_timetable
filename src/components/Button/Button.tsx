

import './button.css';

interface ButtonProps {
   children: string;
}

const Button = ({ children }: ButtonProps) => (
   <button className={'btn'}>{children}</button>
)

export default Button;