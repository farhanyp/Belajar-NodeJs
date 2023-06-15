import winston from "winston";

test("Level logger", () => {
    const logger = winston.createLogger({
        // Untuk menampilkan level
        level:"debug",
        // jika tanpa transport bakal error, minimal 1 transport
        transports:[
            new winston.transports.Console({})
        ]
    })

    logger.log({level: "error",message: "Hello Error"})
    logger.log({level: "warn",message: "Hello Warn"})
    logger.log({level: "info",message: "Hello Info"})

    // Menggunakan shortcut
    logger.http("Hello http")
    logger.verbose("Hello verbose")
    logger.debug("Hello debug")
    logger.silly("Hello silly")
})