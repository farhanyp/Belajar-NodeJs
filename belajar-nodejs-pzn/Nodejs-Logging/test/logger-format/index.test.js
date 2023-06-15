import winston from "winston";

test("Format Logger", () => {
    const logger = winston.createLogger({
        // Menggunakan Format pada logger
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json(),
        ),
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