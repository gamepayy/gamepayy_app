import axios from "axios";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePosts from "@/hooks/usePosts";
import usePost from "@/hooks/usePost";

import Avatar from "./ui/avatar";
import Button from "./ui/button";
import { RiAddFill } from "react-icons/ri";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
}

const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { mutate: mutatePosts } = usePosts();
  const { mutate: mutatePost } = usePost(postId as string);

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

      await axios.post(url, { body });

      toast.success("Success");
      setBody("");
      mutatePosts();
      mutatePost();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [body, mutatePosts, isComment, postId, mutatePost]);

  return (
    <div className="border-neutral-800 py-2 text-white">
      {currentUser ? (
        <div className="flex border rounded-lg border-gray-300 py-5 px-6 justify-between">
          <div className="flex gap-3 w-full">
            <Avatar userId={currentUser.id} />
            <div className="flex items-center justify-between w-full">
              <input
                type="text"
                className="w-full bg-transparent outline-none"
                placeholder={placeholder}
                disabled={isLoading}
                onChange={(event) => setBody(event.target.value)}
                value={body}
              />
              <div className="flex items-center justify-center w-8 h-8 cursor-pointer mr-4">
                <Button
                  label="Post"
                  disabled={isLoading || !body}
                  onClick={onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="py-8">
          <h1 className="text-white text-2xl text-center mb-4 font-bold">
            Welcome to GamePayy
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button label="Login" onClick={loginModal.onOpen} />
            <Button label="Register" onClick={registerModal.onOpen} secondary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
