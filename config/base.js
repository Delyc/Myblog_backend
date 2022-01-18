

export const swaggeroptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Delyce Project",
            version: "1.0.0",
            description: "the docs",

        },
        servers: [
            {url: "http://localhost:5000",
        name: "Localhost"}
        ]
    },
    apis: [
        "routes/*.js"
    ]
}