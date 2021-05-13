import { AxiosResponse } from 'axios';
import customAxios from './config';

const signin = (payload: {
  username: string;
  password: string;
}): Promise<AxiosResponse> => {
  return customAxios.post('/auth/login/vendor', payload);
};

const getUserInfoByToken = (token: string): Promise<AxiosResponse> => {
  return customAxios.post('/auth/token/vendor', { token });
};

const AuthService = {
  signin,
  getUserInfoByToken,
};

export default AuthService;
