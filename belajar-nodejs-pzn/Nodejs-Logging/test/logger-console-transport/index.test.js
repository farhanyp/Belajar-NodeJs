import winston from "winston";

test("Create new logger with transport", () => {
    const logger = winston.createLogger({
        // jika tanpa transport bakal error, minimal 1 transport
        transports:[
            new winston.transports.Console({})
        ]
    })

    logger.log({
        level: "info",
        message: "Hello Logger"
    })
})