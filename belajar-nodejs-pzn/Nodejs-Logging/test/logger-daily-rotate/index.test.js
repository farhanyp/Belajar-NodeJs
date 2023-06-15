import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

test("Logger Transport with Daily Rotate File", () => {
    const logger = winston.createLogger({
        // Untuk menampilkan level
        level:"info",
        // jika tanpa transport bakal error, minimal 1 transport
        transports:[
            // Hanya menerima logging dari info ke atas
            new winston.transports.Console({}),

            // Menggunakan daily rotate
            new DailyRotateFile({
                filename:"app-%DATE%.log",
                zippedArchive: true,
                maxSize:"1m",
                maxFiles:"14d"
            })
        ],
    })

    for (let index = 0; index < 100000; index++) {
        logger.info(`Hello Info ${index}`)
    }
})