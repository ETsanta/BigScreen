import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

function getConfFiles() {
    const script = process.env.npm_lifecycle_script;
    const reg = new RegExp('--mode ([a-z_\\d]+)');
    const result = reg.exec(script as string) as any;
    if (result) {
        const mode = result[1] as string;
        return ['.env', `.env.${mode}`];
    }
    return ['.env', '.env.production'];
}

export function getEnvConfig(match = 'VITE_', confFiles = getConfFiles()) {
    let envConfig = {};
    confFiles.forEach((item) => {
        try {
            const env = dotenv.parse(fs.readFileSync(path.resolve(process.cwd(), item)));
            envConfig = { ...envConfig, ...env };
        } catch (e) {
            console.error(`Error in parsing ${item}`, e);
        }
    });
    const reg = new RegExp(`^(${match})`);
    Object.keys(envConfig).forEach((key) => {
        if (!reg.test(key)) {
            Reflect.deleteProperty(envConfig, key);
        }
    });
    return envConfig;
}

export function wrapperEnv(envConf) {
    const ret: any = {};
  
    for (const envName of Object.keys(envConf)) {
      let realName = envConf[envName].replace(/\\n/g, '\n');
      realName = realName === 'true' ? true : realName === 'false' ? false : realName;
  
      if (envName === 'VITE_PORT') {
        realName = Number(realName);
      }
      if (envName === 'VITE_PROXY' && realName) {
        try {
          realName = JSON.parse(realName.replace(/'/g, '"'));
        } catch (error) {
          realName = '';
        }
      }
      ret[envName] = realName;
      if (typeof realName === 'string') {
        process.env[envName] = realName;
      } else if (typeof realName === 'object') {
        process.env[envName] = JSON.stringify(realName);
      }
    }
    return ret;
  }

export function getRootPath(...dir: string[]) {
    return path.resolve(process.cwd(), ...dir);
  }