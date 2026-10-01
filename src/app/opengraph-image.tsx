import { ImageResponse } from "next/og";
export const alt =
  "Hydra — External Attack Surface Management by Boqueron Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#080f1e",
        color: "#edf4ff",
        padding: "70px 85px",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ color: "#99d7f7", fontSize: 18, letterSpacing: 5 }}>
          BOQUERON LABS
        </div>
        <div style={{ fontSize: 120, letterSpacing: -6, marginTop: 36 }}>
          Hydra
        </div>
        <div style={{ fontSize: 25, color: "#a5b7d1", marginTop: 25 }}>
          External Attack Surface Management
        </div>
        <div style={{ fontSize: 18, color: "#a5b7d1", marginTop: 55 }}>
          hydra.boqueronlabs.com
        </div>
      </div>
      <div
        style={{
          width: 290,
          height: 425,
          display: "flex",
          border: "1px solid #668eab",
          borderRadius: "160px 160px 6px 6px",
          background: "linear-gradient(145deg,#9ddfea,#264260 48%,#625e87)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: 600,
            width: 1,
            background: "#080f1e",
            left: 140,
            top: -50,
            transform: "rotate(27deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            height: 1,
            width: 410,
            background: "#080f1e",
            left: -60,
            top: 230,
            transform: "rotate(-24deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            height: 600,
            width: 1,
            background: "#080f1e",
            left: 145,
            top: -50,
          }}
        />
      </div>
    </div>,
    size,
  );
}
