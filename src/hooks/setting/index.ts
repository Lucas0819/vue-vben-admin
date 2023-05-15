import type { GlobConfig } from '/#/config';

import { getAppEnvConfig } from '/@/utils/env';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_API_AUTH_URL_PREFIX,
    VITE_GLOB_API_UPMS_URL_PREFIX,
    VITE_GLOB_API_TICKET_URL_PREFIX,
  } = getAppEnvConfig();

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_TITLE.replace(/\s/g, '_'),
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
    authUrlPrefix: VITE_GLOB_API_AUTH_URL_PREFIX,
    upmsUrlPrefix: VITE_GLOB_API_UPMS_URL_PREFIX,
    ticketUrlPrefix: VITE_GLOB_API_TICKET_URL_PREFIX,
  };
  return glob as Readonly<GlobConfig>;
};
