import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            tittle: 'EventWise - Event Ticketing API',
            version: '1.0.0',
            description: 'API documentation for the Event Ticketing application',
        },
    },
    apis: ['../routes/*.js'],
};

const specs = swaggerJSDoc(options);

export default specs;