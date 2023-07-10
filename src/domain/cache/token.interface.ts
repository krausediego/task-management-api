export interface ITokenCache {
  setExpirationToken(
    id: string,
    expiration: number,
    token: string,
  ): Promise<void>;
  setToken(id: string, token: string): Promise<void>;
  getToken(id: string): Promise<string>;
  deleteToken(id: string): Promise<void>;
}
