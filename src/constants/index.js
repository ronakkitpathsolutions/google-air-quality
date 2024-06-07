const STATUS_CODES = {
    CREATED: 201,
    SUCCESS: 200,
    REDIRECT: 302,
    BAD_REQUEST: 400,
    UN_AUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
};

const TYPES = {
    SUCCESS: 'success',
    ERROR: 'error'
};

const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin'
};

export { STATUS_CODES, TYPES, USER_ROLES };
