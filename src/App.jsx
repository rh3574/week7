import { useState, useEffect } from "react";
import RelearnTable from "./components/RelearnTable.jsx";
import useJikanImages from "./hooks/useJikanImages.jsx";

function App() {
  const [playerData, setPlayerData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/relearn_songs.json");
        if (!res.ok) throw new Error("Failed to load relearn_songs.json");
        const json = await res.json();
        setPlayerData(json);
      } catch (err) {
        console.error("⚠️ Error loading JSON:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ✅ Always call the hook, even if no data yet
  const jikanImages = useJikanImages(
    playerData?.relearn_songs?.map((s) => s.anime) || []
  );

  // Wait for JSON
  if (loading) return <h1>Loading...</h1>;
  if (!playerData) return <h1>Error loading data</h1>;

  const { player, relearn_songs } = playerData;
  const imagesReady = Object.keys(jikanImages || {}).length > 0;

  if (!imagesReady) return <h1>Loading images...</h1>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>🎓 AMQ Relearn Tracker</h1>
      <h2>Player: {player}</h2>

      <p style={{ color: "#666", fontSize: "16px" }}>
        These are songs you recently missed but had previously guessed correctly.{" "}
        There are{" "}
        <span style={{ color: "#0070f3", fontWeight: "bold" }}>
          {relearn_songs.length}
        </span>{" "}
        songs to relearn.
      </p>


      <RelearnTable songs={relearn_songs} images={jikanImages} />
    </div>
  );

}

export default App;
