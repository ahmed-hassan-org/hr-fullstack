import axios from 'axios';
import {
  LoginModel,
  RegisterModel,
} from '../../../../../libs/wapel-lib/src/lib/core/models/interfaace/AppAuthEntity.interface';
import { baseUrl } from '../core/config/AppConfig';
import { useMutation } from 'react-query';

const loginApi = (loginData: LoginModel) => {
  return axios.post(`${baseUrl}/auth/login`, loginData);
};

export const useLoginApi = () => {
  return useMutation(loginApi);
};

const registerApi = (regModel: RegisterModel) => {
  return axios.post(`${baseUrl}/auth/register`, regModel);
};

export const useRegisterApi= () => {
  return useMutation(registerApi);
};
