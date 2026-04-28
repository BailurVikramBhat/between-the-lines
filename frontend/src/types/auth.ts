export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  success: boolean;
  message: string;
  data: TokenDetails;
  timestamp: string;
}
interface TokenDetails {
  accessToken: string;
  tokenType: string;
  expiresInSeconds: number;
}
export interface ApiError {
  message: string;
}
export interface MeResponse {
  id: string;
  email: string;
  fullName: string;
  tenantId: string;
  tenantSlug: string;
  totpEnabled: boolean;
  isTempPassword: boolean;
}
