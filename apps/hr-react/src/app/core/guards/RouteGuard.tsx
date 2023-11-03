import React, { ReactNode, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useAuthState } from '../../store/AuthState';
import { LocalStorageKeysReact } from '../models/enum/LocalStorgeKeysReact.enum';
import { useJwt } from 'react-jwt';

type Props = {
  children: ReactNode;
};

const RouteGuard = (props: Props) => {
  const authState = useRecoilValue(useAuthState);
  const router = useNavigate();
  const token: string = sessionStorage.getItem(
    LocalStorageKeysReact.APP_TOKEN
  ) as string;
  const { isExpired } = useJwt<string>(token ?? '');

  useEffect(() => {
    if (isExpired) {
      console.log('is token expired: ', isExpired);
      router('/auth/login');
    }
  }, [isExpired]);

  if (!authState.isLoggedIn || isExpired) {
    return <Navigate to="/auth/login" replace />;
  }
  return props.children;
};

export default RouteGuard;
