import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import Modal from "../Modal";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import router from "next/router";
import AuthSocialButton from "../AuthSocialBtn";
import { RiGoogleFill } from "react-icons/ri";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }

        if (callback?.ok && !callback?.error) {
          toast.success("Logged in");
          router.push("/home");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    // NextAuth social
  };

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await signIn("credentials", {
        email,
        password,
      });

      toast.success("Logged in");

      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [loginModal, email, password]);

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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

  const footerContent = (
    <div className="text-white text-center mt-4">
      <p>
        <span
          onClick={onToggle}
          className="
            text-primary 
            cursor-pointer 
            hover:underline
          "
        >
          Sign Up
        </span>{" "}
        free now
      </p>
    </div>
  );

  const socialButtons = (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-center">- Or continue with -</div>
      <div className="flex flex-col gap-4">
        <AuthSocialButton
          icon={RiGoogleFill}
          onClick={() => socialAction("google")}
        >
          Google
        </AuthSocialButton>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Sign in"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      socialButtons={socialButtons}
      footer={footerContent}
    />
  );
};

export default LoginModal;
