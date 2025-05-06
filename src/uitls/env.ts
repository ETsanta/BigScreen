import type { GlobEnvConfig } from '@/types/config';
import { getConfigFileName } from '../../lib/config';


export const getEnv = (key) => {
  const value = import.meta.env[key]
  if (!value) {
    throw new Error(`环境变量 ${key} 未定义`)
  }
  return value
}


export function getAppEnvConfig() {
  const ENV_NAME = getConfigFileName(import.meta.env);

  const ENV = (import.meta.env.DEV
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
    (import.meta.env as unknown as GlobEnvConfig)
    : window[ENV_NAME as any]) as unknown as GlobEnvConfig;;

  const {
    VITE_APP_SHORT_NAME,
    VITE_GLOB_APP_TITLE,
    VITE_PORT,
    VITE_OPEN,
    VITE_API_URL,
    VITE_DROP_CONSOLE,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_BUILD_COMPRESS,
    VITE_PUBLIC_PATH,
  } = ENV;

  if (!/^[a-zA-Z\_]*$/.test(VITE_APP_SHORT_NAME)) {
    // warn(
    //   `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`
    // );
  }

  return {
    VITE_APP_SHORT_NAME,
    VITE_GLOB_APP_TITLE,
    VITE_PORT,
    VITE_OPEN,
    VITE_API_URL,
    VITE_DROP_CONSOLE,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_BUILD_COMPRESS,
    VITE_PUBLIC_PATH,
  };
}