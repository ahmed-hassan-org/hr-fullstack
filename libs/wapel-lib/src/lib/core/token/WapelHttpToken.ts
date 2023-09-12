import { HttpContextToken } from '@angular/common/http';

export const IS_SPINNER_ENABLED = new HttpContextToken<boolean>(() => true);
export const IS_MC_ENABLED_ENABLED = new HttpContextToken<boolean>(() => true);
export const IS_JWT_TOKEN_ENABLED = new HttpContextToken<boolean>(() => true);
export const IS_HEADER_ENABLED = new HttpContextToken<boolean>(() => true);
