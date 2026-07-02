import { useEffect, useState } from "react";
import { VolumeX, Volume2 } from "lucide-react";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(() => {
    if (typeof Audio !== "undefined") {
      const a = new Audio(
        "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=electronic-future-beats-117997.mp3"
      );
      a.loop = true;
      a.volume = 0.2;
      return a;
    }
    return null;
  });

  const toggle = () => {
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((p) => !p);
  };

  useEffect(() => () => audio?.pause(), [audio]);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 left-6 z-[200] p-2.5 rounded-lg transition-all duration-200"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-hover)",
        color: playing ? "var(--accent)" : "var(--text-muted)",
      }}
      aria-label="Toggle background music"
      title={playing ? "Pause music" : "Play ambient music"}
    >
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
    </button>
  );
}
