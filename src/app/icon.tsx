import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#C96A26",
          borderRadius: 16,
        }}
      >
        <div style={{ display: "flex", fontSize: 34 }}>🐾</div>
      </div>
    ),
    { ...size }
  );
}
