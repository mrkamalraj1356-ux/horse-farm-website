/**
 * Robust utility to extract YouTube embed URL from ANY YouTube link format:
 * - https://www.youtube.com/shorts/6O9T3mQDLNE?t=2&feature=share
 * - https://youtu.be/2VpAUWy4MXA
 * - https://www.youtube.com/watch?v=2VpAUWy4MXA
 * - https://m.youtube.com/watch?v=2VpAUWy4MXA
 * - https://www.youtube.com/embed/2VpAUWy4MXA
 * - Or directly the 11-character video ID
 */
export function getYouTubeEmbedUrl(url: string, autoPlay: boolean = false): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // Pattern 1: youtu.be/<id>
  const shortMatch = trimmed.match(/youtu\.be\/([\w-]{11})/i);
  if (shortMatch && shortMatch[1]) {
    return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0&modestbranding=1${autoPlay ? '&autoplay=1' : ''}`;
  }

  // Pattern 2: youtube.com/shorts/<id>
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([\w-]{11})/i);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}?rel=0&modestbranding=1${autoPlay ? '&autoplay=1' : ''}`;
  }

  // Pattern 3: watch?v=<id> or embed/<id> or v/<id>
  const watchMatch = trimmed.match(/(?:[?&]v=|embed\/|v\/)([\w-]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0&modestbranding=1${autoPlay ? '&autoplay=1' : ''}`;
  }

  // Pattern 4: If user pastes only the 11-char video ID directly (e.g. "6O9T3mQDLNE")
  if (/^[\w-]{11}$/.test(trimmed)) {
    return `https://www.youtube.com/embed/${trimmed}?rel=0&modestbranding=1${autoPlay ? '&autoplay=1' : ''}`;
  }

  return null;
}

export function isYouTubeUrl(url: string): boolean {
  return getYouTubeEmbedUrl(url) !== null;
}
