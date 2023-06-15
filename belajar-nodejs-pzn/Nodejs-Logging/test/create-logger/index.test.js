import winston from "winston";

test.skip("Create new logger", () => {
    const logger = winston.createLogger({})

    logger.log({
        level: "info",
        message: "Hello Logger"
    })
})