import { runBuildConfig } from './config';
import colors from 'picocolors';

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);
    if (typeof window !== 'undefined') {
      throw new Error('此脚本必须在 Node.js 环境中运行');
    }
    if (!argvList.includes('disabled-config')) {
      runBuildConfig();
    }
  } catch (error) {
    console.log(colors.red('vite build error:\n' + error));
    process.exit(1);
  }
};

runBuild();
