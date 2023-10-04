interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  contained?: boolean;
  children: string;
}
export const Button: React.FC<ButtonProps> = ({contained=false, children, ...props}) => {
  return (
    <button {...props} className={`${contained ? 'app-button_filled' : 'app-button_outlined'} app-button`}>
      {children}
    </button>
  );
};
