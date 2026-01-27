import { useState, useCallback, useEffect } from "react";
import { apiPosts } from "../../api/api";
import CreatePost from "./CreatePost";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId: string;
};

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

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

              <small className="text-muted">
                Publicado el {formatDate(post.createdAt)}
              </small>

              <p className="mt-2 mb-0">{post.content}</p>
              <p className="mt-2 mb-0">Publicado por: {post.authorId}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
