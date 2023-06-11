import { Console } from "console"
import fs from "fs"

const logFile = fs.createWriteStream("logging.log")

const log = new Console({
    stdout: logFile,
    stderr: logFile
})

const name = {
    firstName: "Farhan",
    middleName: "Yudha",
    lastName: "Pratama"
}

log.log("Hello World")
log.table(name)