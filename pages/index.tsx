import Form from "@/components/Form";
import FollowBar from "@/components/layout/FollowBar";
import PostFeed from "@/components/posts/PostFeed";

export default function Home() {
  return (
    <>
      <div className="col-span-9 text-white">
        <div>
          <Form placeholder={"Whats Up?"} />
          <PostFeed />
        </div>
      </div>
      <div className="col-span-3">
        <FollowBar />
      </div>
    </>
  );
}
