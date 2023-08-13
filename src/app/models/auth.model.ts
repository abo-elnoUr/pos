export interface TokenResponse {
  user: User;
  token: string;
  expiration: string;
}

export interface User {
  id: string;
  name: string;
  role: string;
  permissions: string[];
}
