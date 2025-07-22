import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "../package.json";
import { GLOB_CONFIG_FILE_NAME } from "./constant";

export function configHtmlPlugin(env: any, isBuild: boolean) {
  const { VITE_APP_TITLE, VITE_PUBLIC_PATH } = env;

  const path = VITE_PUBLIC_PATH.endsWith("/")
    ? VITE_PUBLIC_PATH
    : `${VITE_PUBLIC_PATH}/`;

  const getAppConfigSrc = () => {
    return `${path || "/"}${GLOB_CONFIG_FILE_NAME}?v=${
      pkg.version
    }-${new Date().getTime()}`;
  };

  const htmlPlugin = () => {
    // if(isBuild) {
    //     return createHtmlPlugin({
    //         minify: true,
    //         inject: {
    //             data: {
    //                 title: VITE_APP_TITLE,
    //             },
    //             tags: [
    //                 {
    //                     tag: 'script',
    //                     attrs: {
    //                         src: getAppConfigSrc(),
    //                     },
    //                 },
    //             ],
    //         },
    //     });
    // }
    getAppConfigSrc();
  };
  return htmlPlugin;
}
