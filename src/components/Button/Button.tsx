

import './button.css';

interface ButtonProps {
   children: string;
   width?: string;
   color: string;
   onSubmit?: (e: React.FormEvent<HTMLButtonElement>) => void
   onClick?: () => void;
   disabled?: boolean;
}

interface BgColors {
   style: object
}

const Button = ({ children, width, color, onSubmit, onClick, disabled }: ButtonProps) => {

   const white: BgColors = {
      style: {
         backgroundColor: '#fff',
         color: '#323854',
         border: '1px solid #8D7FC7',
         height: '32px',
         width: '56px'
      }
   }

   const purple: BgColors = {
      style: {
         backgroundColor: '#8D7FC7',
         color: '#fff',
         height: '32px',
         width: '56px',
         border: 'none',
      }
   }

   const violet: BgColors = {
      style: {
         backgroundColor: '#DECFFF',
         color: '#323854',
         width: width ? width + 'px' : ''
      }
   }

   let styleBtn, classNames;

   switch (color) {
      case 'purple':
         styleBtn = purple.style;
         classNames = 'small-btn';
         break;
      case 'white':
         styleBtn = white.style;
         classNames = 'small-btn';
         break;
      case 'violet':
         styleBtn = violet.style;
         classNames = 'btn';
   }


   return (
      <button
         className={classNames}
         style={styleBtn}
         onSubmit={(e) => onSubmit ? onSubmit(e) : {}}
         onClick={() => onClick ? onClick() : {}}
         disabled={disabled}>
         {children}
      </button >
   )
}

export default Button;