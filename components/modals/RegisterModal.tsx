import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import { signIn } from "next-auth/react";

import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import Modal from "../Modal";
import axios from "axios";
import { toast } from "sonner";
import AuthSocialButton from "../AuthSocialBtn";
import { RiGoogleFill } from "react-icons/ri";

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      // REGISTER and LOGIN
      await axios.post("/api/register", {
        email,
        password,
        username,
        name,
      });

      toast.success("Account created");

      signIn("credentials", {
        email,
        password,
      });

      registerModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [registerModal, email, password, username, name]);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }

    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal, isLoading]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const socialButtons = (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-center">- Or continue with -</div>
      <div className="flex flex-col gap-4">
        <AuthSocialButton icon={RiGoogleFill} onClick={() => {}}>
          Google
        </AuthSocialButton>
      </div>
    </div>
  );

  const footerContent = (
    <div className="text-white text-center mt-4">
      <p>
        I already have an account{" "}
        <span
          onClick={onToggle}
          className="
            text-primary 
            cursor-pointer 
            hover:underline
          "
        >
          Sign In
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Sign Up"
      actionLabel="Sign Up"
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      socialButtons={socialButtons}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
