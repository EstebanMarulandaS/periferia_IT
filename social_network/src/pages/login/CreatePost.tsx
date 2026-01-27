import { useState } from "react";
import { apiPosts } from "../../api/api";

type Props = {
  onPostCreated: () => void;
};

export default function CreatePost({ onPostCreated }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      setLoading(true);

      await apiPosts.post("/posts", {
        title,
        content,
      });

      setTitle("");
      setContent("");
      onPostCreated();
    } finally {
      setLoading(false);
    }
  };

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
          {loading ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
}
