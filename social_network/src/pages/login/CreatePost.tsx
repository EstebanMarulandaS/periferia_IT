import { useState, useEffect } from "react";
import { apiPosts } from "../../api/api";

type Props = {
  onPostCreated: () => void;
  editingPost: {
    id: number;
    title: string;
    content: string;
  } | null;
  clearEditing: () => void;
  deletePost?: {
    id: number;
    title: string;
    content: string;
  } | null;
};

export default function CreatePost({
  onPostCreated,
  editingPost,
  clearEditing,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      setLoading(true);

      if (editingPost) {
        // EDITAR
        await apiPosts.put(`/posts/${editingPost.id}`, {
          title,
          content,
        });
        clearEditing();
      } else {
        // CREAR
        await apiPosts.post("/posts", {
          title,
          content,
        });
      }

      setTitle("");
      setContent("");
      onPostCreated();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    }
  }, [editingPost]);

  return (
    <div className="card mb-3">
      <div className="card-body">
        <input
          className="form-control mb-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-2"
          placeholder="Escribe el contenido del post"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="btn btn-primary btn-sm"
          onClick={handleSubmit}
          disabled={loading || !title.trim() || !content.trim()}
        >
          {editingPost
            ? "Actualizar post"
            : !title.trim() && !content.trim()
              ? "Crear post"
              : "Crear post"}
        </button>
      </div>
    </div>
  );
}
