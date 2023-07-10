export type IJwtPayload = Record<string, any>;

export interface IJwtService {
  createExpirationToken(
    payload: IJwtPayload,
    secret: string,
    expiresIn: string | number,
  ): string;
  createToken(payload: IJwtPayload, secret: string): string;
  checkToken(token: string, secret: string): Promise<any>;
  decode(token: string):
    | string
    | {
        [key: string]: any;
      };
}
