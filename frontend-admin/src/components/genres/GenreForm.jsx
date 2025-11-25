import { useState, useEffect } from "react";

export default function GenreForm({ onSubmit, loading, genre, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (genre) {
      setName(genre.name || "");
    }
  }, [genre]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim() });
    if (!genre) setName("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="genre-name">
            {genre ? "Edit Genre Name" : "Add New Genre"}
          </label>
          <input
            id="genre-name"
            className="input"
            placeholder={genre ? "Edit genre name" : "Enter new genre name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(14, 165, 233, 0.3)",
              color: "#e2e8f0",
            }}
          />
        </div>
        <div className="action-buttons">
          {genre && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? (
              <>
                <span
                  className="spinner"
                  style={{ width: "14px", height: "14px" }}
                ></span>
                {genre ? "Saving..." : "Adding..."}
              </>
            ) : genre ? (
              "💾 Save"
            ) : (
              "➕ Add Genre"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
