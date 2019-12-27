import * as jwt_decode from 'jwt-decode';

export function decodeToken(customToken?: string) {
  if (!customToken) {
    return jwt_decode(localStorage.getItem('token'));
  }
  return jwt_decode(customToken);
}
