import { useState, useEffect } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";
import Navbarauth from "../components/Navbarauth";

export default function UserGenreSelector() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [userRes, genresRes] = await Promise.all([
          axios.get("http://localhost:8081/api/users/me"),
          axios.get("http://localhost:8081/api/genres"),
        ]);
        setUserData(userRes.data);
        setGenres(genresRes.data);
        setSelected(userRes.data.genres?.map((g) => g.name) || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        alert("Failed to load data. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleGenre = (name) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((g) => g !== name) : [...prev, name]
    );
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await axios.put("http://localhost:8081/api/users/genres", selected);
      alert("Genres updated successfully!");
    } catch (err) {
      console.error("Failed to save genres:", err);
      alert("Failed to save genres. Try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-white p-8">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
        <Navbarauth />
      <h1 className="text-3xl font-bold mb-6">Select Your Genres</h1>

      <div className="flex flex-wrap gap-2 mb-4">
        {genres.map((g) => (
          <button
            key={g.id}
            onClick={() => toggleGenre(g.name)}
            className={`px-3 py-1 rounded ${
              selected.includes(g.name)
                ? "bg-blue-600 border border-blue-400"
                : "bg-gray-800 border border-gray-600"
            }`}
          >
            {g.name}
          </button>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Genres"}
      </button>
    </div>
  );
}
