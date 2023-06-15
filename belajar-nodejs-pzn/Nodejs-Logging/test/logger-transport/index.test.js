import winston from "winston";

test("Transport Logger", () => {
    const logger = winston.createLogger({
        // Menggunakan Format pada logger
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json(),
        ),
        // Untuk menampilkan level
        level:"info",
        // jika tanpa transport bakal error, minimal 1 transport
        transports:[
            // Hanya menerima logging dari info ke atas
            new winston.transports.Console({}),

            // Hanya menerima logging error saja
            new winston.transports.File({
                level:"error",
                filename:"error.log"
            }),
            new winston.transports.File({
                level:"info",
                filename:"info.log"
            })
        ]
    })

    logger.log({level: "error",message: "Hello Error"})
    logger.log({level: "warn",message: "Hello Warn"})
    logger.log({level: "info",message: "Hello Info"})
})