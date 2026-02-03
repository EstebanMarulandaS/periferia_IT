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
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const fetchPosts = useCallback(async () => {
    const res = await apiPosts.get("/posts");
    setPosts(res.data.posts);
  }, []);

  const handleDeletePost = async (postId: number) => {
    try {
      await apiPosts.delete(`/posts/${postId}`);
      fetchPosts();
    } catch (error) {
      console.error("Error eliminando el post", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="container mt-4">
      <div className="col-12 col-md-8 mx-auto">
        <CreatePost
          onPostCreated={fetchPosts}
          editingPost={editingPost}
          clearEditing={() => setEditingPost(null)}
        />

        {posts.map((post) => (
          <div className="card mb-3" key={post.id}>
            <div className="card-body">
              <h5 className="mb-1">{post.title}</h5>

              <small className="text-muted">
                Publicado el {formatDate(post.createdAt)}
              </small>

              <p className="mt-2 mb-0">{post.content}</p>
              <p className="mt-2 mb-0">Publicado por: {post.authorId}</p>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => setEditingPost(post)}
              >
                Editar
              </button>
              <button
                className="btn btn-danger btn-sm mr-5 ml-5"
                onClick={() => handleDeletePost(post.id)}
              >
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
