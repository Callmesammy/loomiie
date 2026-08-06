import { ImageResponse } from "next/og";

export const alt = "LOOMIE — Design That Connects";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050507",
          color: "#ffffff",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 70,
              height: 36,
              borderRadius: 18,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "0 8px",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#050507" }} />
            <div style={{ width: 18, height: 18, borderRadius: 9, background: "#050507" }} />
          </div>
          <div style={{ fontSize: 28, letterSpacing: 8, fontWeight: 700 }}>LOOMIE</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 1, letterSpacing: -3 }}>
            DESIGN THAT
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1,
              letterSpacing: -3,
              borderBottom: "8px solid #ffffff",
              paddingBottom: 12,
              alignSelf: "flex-start",
            }}
          >
            CONNECTS
          </div>
        </div>
      </div>
    ),
    size
  );
}
