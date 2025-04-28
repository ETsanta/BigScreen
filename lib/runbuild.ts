import { runBuildConfig } from './config';
import colors from 'picocolors';

export const runBuild = async () => {
  try {
    const argvList = process.argv.splice(2);

    runBuildConfig();

  } catch (error) {
    console.log(colors.red('vite build error:\n' + error));
    process.exit(1);
  }
};
runBuild();
