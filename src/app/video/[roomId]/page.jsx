"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VideoRoom() {
  const router = useRouter();
  const { roomId } = useParams()
  const [iframeSrc, setIframeSrc] = useState("");

  useEffect(() => {
    if (roomId) {
      setIframeSrc(`https://softwaresystemsapp.daily.co/${roomId}`);
    }
  }, [roomId]);

  return (
    <div style={{ height: "100vh" }}>
      {iframeSrc && (
        <iframe
          src={iframeSrc}
          allow="camera; microphone; fullscreen; speaker; display-capture"
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Video Room"
        ></iframe>
      )}
    </div>
  );
}
