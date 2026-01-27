import { useState, useCallback, useEffect } from "react";
import { apiPosts } from "../../api/api";
import CreatePost from "./CreatePost";

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = useCallback(async () => {
    const res = await apiPosts.get("/posts");
    setPosts(res.data.posts);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container mt-4">
      <div className="col-12 col-md-8 mx-auto">
        <CreatePost onPostCreated={fetchPosts} />

        {posts.map((post) => (
          <div className="card mb-3" key={post.id}>
            <div className="card-body">
              <h5 className="mb-1">{post.title}</h5>
              <p className="mb-1">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
