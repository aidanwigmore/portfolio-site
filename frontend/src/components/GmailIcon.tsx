import React from "react";

export default function GmailIcon({ size = 24 }: { size?: number }) {
  return (
    <img
      src={"/gmail_icon_96.png"}
      alt="Gmail Icon"
      style={{
        width: size,
        height: size,
      }}
    />
  );
}