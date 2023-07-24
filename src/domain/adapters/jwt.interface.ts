export type IJwtPayload = Record<string, any>;

export interface IJwtService {
  createExpirationToken(
    payload: IJwtPayload,
    expiresIn: string | number,
  ): string;
  createToken(payload: IJwtPayload): string;
  checkToken(token: string): Promise<any>;
  decode(token: string):
    | string
    | {
        [key: string]: any;
      };
}
