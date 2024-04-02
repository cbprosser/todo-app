export const COOKIES = {
  FGPT: 'hasfgpt',
};

export const API = {
  ENDPOINTS: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    SIGNUP: '/users/save',
    CONFIRM_REGISTRATION: (id: string) => `/users/confirm/${id}`,
    LISTS: (username: string) => `/lists/${username}`,
    ADD_LIST: (username: string) => `/lists/${username}/add`,
    UPDATE_LIST: (username: string) => `/lists/${username}/update`,
    DELETE_LIST: (username: string, listId: string) =>
      `/lists/${username}/${listId}/delete`,
    LIST: (username: string, listId: string) =>
      `/lists/items/${username}/${listId}`,
    ADD_ITEM_TO_LIST: (username: string, listId: string) =>
      `/lists/items/${username}/${listId}/add`,
    UPDATE_ITEM_IN_LIST: (username: string, listId: string) =>
      `/lists/items/${username}/${listId}/update`,
    DELETE_ITEM_FROM_LIST: (
      username: string,
      listId: string,
      listItemId: string
    ) => `/lists/items/${username}/${listId}/${listItemId}/delete`,
  },
};

export const HTML = {
  NBSP: '\u00A0',
};
