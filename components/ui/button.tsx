interface ButtonProps {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  onClick,
  large,
  disabled,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
          disabled:opacity-70
          disabled:cursor-not-allowed
          font-semibold
          transition
          uppercase
          ${fullWidth ? "w-full" : "w-fit"}
          ${secondary ? "bg-transparent" : "bg-primary"}
          ${secondary ? "text-white" : "text-black"}
          ${secondary ? "hover:bg-primary/80" : "hover:opacity-80"}
          ${secondary ? "border-2 border-primary " : "border-0"}
          ${large ? "text-xl" : "text-md"}
          ${large ? "px-5" : "px-4"}
          ${large ? "py-3" : "py-2"}
          ${outline ? "bg-transparent" : ""}
          ${outline ? "border-white" : ""}
          ${outline ? "text-white" : ""}
          ${outline ? "hover:bg-white/60" : ""}
        `}
    >
      {label}
    </button>
  );
};

export default Button;
