interface WaveformProps {
  className?: string;
  bars?: number;
  animate?: boolean;
}

export function Waveform({ className = '', bars = 5, animate = true }: WaveformProps) {
  const delays = ['0s', '0.15s', '0.3s', '0.15s', '0s'];
  const heights = [60, 80, 100, 80, 60];

  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-full bg-accent ${animate ? 'animate-bar' : ''}`}
          style={{
            height: `${heights[i % heights.length]}%`,
            animationDelay: delays[i % delays.length],
            minHeight: '4px',
          }}
        />
      ))}
    </div>
  );
}
