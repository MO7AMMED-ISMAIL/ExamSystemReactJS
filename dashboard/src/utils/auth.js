
export const isTokenExpired = (expirationTime) => {
    return Date.now() > expirationTime;
};
