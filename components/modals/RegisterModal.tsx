import { toast } from "sonner";
import { RiGoogleFill } from "react-icons/ri";
import { signIn } from "next-auth/react";

import { useCallback, useState } from "react";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { Input } from "../ui/input";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'

import { registerSchema } from "../../validators/auth"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/shadcn/ui/form"
import { SHADCNInput } from "../../components/shadcn/ui/SHADCNInput"
import { Button } from "../../components/shadcn/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/shadcn/ui/select"

import Modal from "../Modal";
import axios from "axios";
import AuthSocialButton from "../AuthSocialBtn";

type SHADCNInput = z.infer<typeof registerSchema>;

const RegisterModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SHADCNInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
        username: "",
        email: "",
        dob: new Date(),
        timeZone: "",
        password: "",
        confirmPassword: "",
        weeklyHoursPlayed: 0,
        yearsPlayed: "",
        preferredGames: "",
        skillLevel: "",
    },
})

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
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem >
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <SHADCNInput placeholder="First Name" className=""
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <SHADCNInput placeholder="Last Name" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <SHADCNInput placeholder="Password" {...field} type="password" className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <SHADCNInput placeholder="Confirm Password" {...field} type="password" className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full bg-[#470D92] text-[#FCFCFC] rounded-[20px]">Submit</Button>
        </form>
      </Form>
      {/* <Input
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
      /> */}
    </div>
  );

  const socialButtons = (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-center">- Or continue with -</div>
      <div className="flex flex-col gap-4">
        <AuthSocialButton icon={RiGoogleFill} onClick={() => { }}>
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
