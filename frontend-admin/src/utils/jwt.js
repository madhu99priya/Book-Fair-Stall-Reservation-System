import { jwtDecode } from 'jwt-decode';

// Decode and return claims; throws if invalid token
export function decodeJwt(token) {
  return jwtDecode(token);
}

// Safe helper to avoid crashing if token is invalid or expired
export function tryDecodeJwt(token) {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}