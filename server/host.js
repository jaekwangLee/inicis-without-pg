require('dotenv').config();

const getServerDomain = () => {
    const DEV = process.env.DEV;
    switch (DEV) {
        case 'true':
            return `http://localhost:${process.env.PORT}`;

        case 'false':
            return ''; // production domain
    }
};

const getClientDomain = () => {
    const DEV = process.env.DEV;
    switch (DEV) {
        case 'true':
            return `http://localhost:${process.env.CLIENT_PORT}`;

        case 'false':
            return ''; // production domain
    }
};

export { getServerDomain, getClientDomain };
