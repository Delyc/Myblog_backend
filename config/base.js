

export const swaggeroptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Delyce Project",
            version: "1.0.0",
            description: "the docs",

        },
        servers: [
            {
                url: "http://localhost:5000",
                name: "Localhost"
            },
        {
            url: "https://portifolio-website.herokuapp.com/",
            name: "herokuapp"
        }
        ]
    },
    apis: [
        "routes/*.js"
    ]
}
