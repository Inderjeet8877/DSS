interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// Basic Rate Limiting Configuration
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // Allow max 5 submissions per minute per IP

/**
 * Basic in-memory rate limiter for serverless environment.
 * Note: In a production cluster/serverless setup, a persistent store like Redis should be used.
 * @param ip IP address of the client
 * @returns boolean true if the request is allowed, false if rate limit exceeded
 */
export function checkRateLimit(ip: string): boolean {
  if (!ip) return true; // Fail-safe if IP cannot be determined

  const now = Date.now();
  const record = rateLimitMap.get(ip) || { timestamps: [] };

  // Filter out timestamps older than the window
  const validTimestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < WINDOW_MS
  );

  if (validTimestamps.length >= MAX_REQUESTS) {
    // Update record with filtered timestamps
    rateLimitMap.set(ip, { timestamps: validTimestamps });
    return false;
  }

  // Record this request
  validTimestamps.push(now);
  rateLimitMap.set(ip, { timestamps: validTimestamps });
  return true;
}
