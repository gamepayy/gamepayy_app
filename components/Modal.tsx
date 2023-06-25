import { useCallback } from "react";
import Button from "./ui/button";
import { RiCloseFill, RiFacebookFill, RiGoogleFill } from "react-icons/ri";
import AuthSocialButton from "./AuthSocialBtn";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  socialButtons?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  socialButtons,
  actionLabel,
  footer,
  disabled,
}) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    onClose();
  }, [onClose, disabled]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [onSubmit, disabled]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="items-center justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative flex flex-col gap-10 bg-black px-16 py-12 text-white w-[488px]">
          <button
            className="
                absolute
                top-5
                right-5
                  ml-auto
                  border-0 
                  text-white 
                  hover:opacity-70
                  transition
                "
            onClick={handleClose}
          >
            <RiCloseFill size={24} />
          </button>
          <div className="text-center flex flex-col gap-3">
            <h2 className="font-semibold">{title}</h2>
            <div>{footer}</div>
          </div>
          {body}
          <Button
            disabled={disabled}
            label={actionLabel}
            fullWidth
            large
            onClick={handleSubmit}
          />
          {socialButtons}
        </div>
      </div>
    </>
  );
};

export default Modal;
