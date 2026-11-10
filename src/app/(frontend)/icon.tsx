import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
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
          background: "#f4efe6",
          borderRadius: "7px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontWeight: 900,
          fontSize: 12,
          color: "#111827",
          letterSpacing: "-0.5px",
        }}
      >
        <span>FRA</span>
        <div
          style={{
            width: "3.5px",
            height: "3.5px",
            background: "#ea580c",
            marginLeft: "0.5px",
            marginBottom: "-4px",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
