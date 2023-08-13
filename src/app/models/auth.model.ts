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

export interface Login {
  username: string;
  password: string;
}

export interface LoginBranchDto {
  userId: string;
  treasuryId: string;
}
export interface LoginResponseWithTreasury {
  treasuryId?: string;
  treasuryName: string;
  branchNameAr: string;
  branchName: string;
  userName?: string;
}

export interface LoginBranchDto {
  userId: string;
  treasuryId: string;
}

export interface LoginResponse {
  userId: string;
  treasuries: LoginResponseWithTreasury[];
}
