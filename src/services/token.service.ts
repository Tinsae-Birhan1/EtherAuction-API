import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import {jwtSecret, jwtRefreshExpirationDays, jwtAccessExpirationMinutes} from '../config/config';
import { tokenTypes } from '../config/tokens';
import { Token } from '../models';

interface TokenPayload {
  sub: string;
  iat: number;
  exp: number;
  type: string;
}

const generateToken = (userId: string, expires: dayjs.Dayjs, type: string, secret: string = jwtSecret): string => {
  const payload: TokenPayload = {
    sub: userId,
    iat: dayjs().unix(),
    exp: expires.unix(),
    type,
  };

  return jwt.sign(payload, secret);
};

const saveToken = async (token: string, userId: string, expires: dayjs.Dayjs, type: string, blacklisted: boolean = false) => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, jwtSecret) as TokenPayload;
  const tokenDoc = await Token.findOne({
    token,
    user: payload.sub,
    type,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

const generateAuthTokens = async (userId: string) => {
  const accessTokenExpires = dayjs().add(jwtAccessExpirationMinutes, 'minutes');
  const accessToken = generateToken(userId, accessTokenExpires, tokenTypes.ACCESS);
  const refreshTokenExpires = dayjs().add(jwtRefreshExpirationDays, 'days');
  const refreshToken = generateToken(userId, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(refreshToken, userId, refreshTokenExpires, tokenTypes.REFRESH);
  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};




const tokenService = {
    generateToken,
  generateAuthTokens,
  verifyToken,
  saveToken,
  };
  
  export default tokenService;
  