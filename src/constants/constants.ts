export const COOKIES = {
  FGPT: 'hasfgpt',
};

export const API = {
  ENDPOINTS: {
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
    LISTS: (username: string) => `/lists/${username}`,
    ADD_LIST: (username: string) => `/lists/${username}/add`,
    UPDATE_LIST: (username: string) => `/lists/${username}/update`,
    DELETE_LIST: (username: string, listId: string) => `/lists/${username}/${listId}/delete`,
  },
};

export const HTML = {
  NBSP: '\u00A0',
};
