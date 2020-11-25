let user;

export const setUser = (name) => localStorage.setItem('username', name);

export const getUser = () => localStorage.getItem('username');