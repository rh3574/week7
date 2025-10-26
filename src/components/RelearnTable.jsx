import React from "react";

export default function RelearnTable({ songs = [], images = {} }) {
  if (!songs.length) return <p>No relearn songs found.</p>;

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom: "2px solid #ccc",
              backgroundColor: "#fafafa",
            }}
          >
            <th style={{ padding: "10px", width: "120px" }}>Image</th>
            <th style={{ padding: "10px", width: "260px" }}>Anime</th>
            <th style={{ padding: "10px", width: "220px" }}>Song Title</th>
            <th style={{ padding: "10px", width: "140px" }}>Recent Pattern</th>
            <th style={{ padding: "10px", width: "320px" }}>Recent Files</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song, i) => {
            const anime = song.anime || "Unknown";
            const title = song.title || "Unknown";
            const pattern = song.pattern || "";
            const files = song.recent_files || [];
            const img = images[anime] || "https://i.imgur.com/eE3z8gT.png";

            return (
              <tr
                key={i}
                style={{
                  borderBottom: "1px solid #ddd",
                  verticalAlign: "middle",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    verticalAlign: "middle",
                  }}
                >
                  <img
                    src={img}
                    alt={anime}
                    style={{
                      width: "90px",
                      height: "125px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    }}
                    onError={(e) =>
                      (e.target.src = "https://i.imgur.com/eE3z8gT.png")
                    }
                  />
                </td>

                <td
                  style={{
                    padding: "12px",
                    fontWeight: "bold",
                    verticalAlign: "middle",
                  }}
                >
                  {anime}
                </td>

                <td
                  style={{
                    padding: "12px",
                    verticalAlign: "middle",
                  }}
                >
                  {title}
                </td>

                <td
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    fontSize: "20px",
                    verticalAlign: "middle",
                    whiteSpace: "nowrap",
                  }}
                >
                  {pattern}
                </td>

                {/* 👇 Clean bullet list with consistent spacing */}
                <td
                  style={{
                    padding: "12px 8px",
                    fontSize: "12px",
                    color: "#666",
                    lineHeight: "1.6",
                    verticalAlign: "middle", // 👈 change from 'top' to 'middle'
                    textAlign: "left",
                  }}
                >
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      style={{
                        marginBottom: "3px",
                        paddingLeft: "10px",
                      }}
                    >
                      • {file}
                    </div>
                  ))}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
