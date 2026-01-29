import { FC, useState } from 'react';

const KILN_PORT = 6006;

interface KilnLinkProps {
  /** Component path in kiln (e.g., '/button', '/alert') */
  path: string;
}

/**
 * Get the Kiln base URL dynamically based on current environment
 */
const getKilnBaseUrl = (): string => {
  if (typeof window === 'undefined') {
    return `http://localhost:${KILN_PORT}`;
  }
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${KILN_PORT}`;
};

const PlayIcon: FC<{ className?: string }> = ({ className }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    stroke="none" 
    className={className}
    aria-hidden="true"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export const KilnLink: FC<KilnLinkProps> = (props) => {
  const { path } = props;
  const [hasPlayed, setHasPlayed] = useState(false);

  const kilnUrl = `${getKilnBaseUrl()}${path}`;

  const handleMouseEnter = () => {
    if (!hasPlayed) {
      setHasPlayed(true);
    }
  };

  return (
    <a
      href={kilnUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      className="Bear-KilnLink inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-500 hover:bg-pink-200 dark:hover:bg-pink-900/50 hover:scale-110 transition-all"
      title="Play live demo"
    >
      <PlayIcon 
        className={hasPlayed ? '' : 'animate-pulse'} 
      />
    </a>
  );
};

export default KilnLink;
