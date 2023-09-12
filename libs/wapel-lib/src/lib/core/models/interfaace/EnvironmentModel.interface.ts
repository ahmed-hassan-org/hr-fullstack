/** @description if user wants to share env data between other apps or library he can use this interface in provider */
export interface EnvironmentModel {
  production: boolean;
  config: EnvConfig;
  appsUrl: EnvUrlConfig;
  socketServer: EnvSocketConfig;
}

export interface EnvConfig {
  dateFormat: string;
  timeFormatLong: string;
  timeFormatShort: string;
}

export interface EnvUrlConfig {
  baseUrl: string;
  nodeUrl: string;
}
export interface EnvSocketConfig {
  url: string;
}
