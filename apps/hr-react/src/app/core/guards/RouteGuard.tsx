import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useAuthState } from '../../store/AuthState';
import { LocalStorageKeysReact } from '../models/enum/LocalStorgeKeysReact.enum';
import { useJwt } from 'react-jwt';

type Props = {
  children: any;
};

const RouteGuard = (props: Props) => {
  const authState = useRecoilValue(useAuthState);
  const token: string = sessionStorage.getItem(
    LocalStorageKeysReact.APP_TOKEN
  ) as string;
  const { decodedToken, isExpired } = useJwt<string>(token ?? '');

  useEffect(() => {
    console.log('is token expired: ', isExpired);
    console.log(decodedToken);
  }, [isExpired]);

  if (!authState.isLoggedIn || isExpired) {
    return <Navigate to="/auth/login" replace />;
  }
  return props.children;
};

export default RouteGuard;
