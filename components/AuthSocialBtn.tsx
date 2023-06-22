import { IconType } from "react-icons";

interface AuthSocialButtonProps {
  icon: IconType;
  onClick: () => void;
  children?: React.ReactNode;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex relative items-center w-full bg-transparent justify-between border border-gray-400 px-4 
      py-3 uppercase hover:bg-primary hover:text-gray-900 hover:border-primary"
    >
      {children}

      <div>
        <div className="absolute shrink-0 bg-white h-full w-[1px] top-0 right-14"></div>
        <Icon className="w-6 h-6" />
      </div>
    </button>
  );
};

export default AuthSocialButton;
