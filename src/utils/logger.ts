import { format } from 'date-fns'
import fs from 'fs'
import path from 'path'
import pc from 'picocolors'

class Log {
    private static logsDir = path.join(process.cwd(), 'logs')

    private static ensureLogDirectoryExists(): void {
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir, { recursive: true })
        }
    }

    private static getLogFileName(): string {
        return format(new Date(), 'yyyy-MM-dd') + '.log'
    }

    private static logMessage(level: string, message: string, saveToFile: boolean = false): void {
        const formattedMessage = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')} [${level}] - ${message}`

        // Determine message color
        let coloredMessage
        switch (level) {
            case 'SUCCESS':
                coloredMessage = pc.green(formattedMessage)
                break
            case 'INFO':
                coloredMessage = pc.blue(formattedMessage)
                break
            case 'WARNING':
                coloredMessage = pc.yellow(formattedMessage)
                break
            case 'ERROR':
                coloredMessage = pc.red(formattedMessage)
                break
            default:
                coloredMessage = formattedMessage
                break
        }

        // Log to console
        console.log(coloredMessage)

        // Optionally save to log file
        if (saveToFile) {
            this.ensureLogDirectoryExists()
            const logFilePath = path.join(this.logsDir, this.getLogFileName())
            fs.appendFile(logFilePath, formattedMessage + '\n', err => {
                if (err) {
                    console.error(pc.red('Failed to write to log file:'), err)
                }
            })
        }
    }

    /**
     * Log a success message
     *
     * @param message
     * @param saveToFile (default: false) Whether to save the log to a file
     *
     * @return void
     */
    public static success(message: string, saveToFile: boolean = false): void {
        this.logMessage('SUCCESS', message, saveToFile)
    }

    /**
     * Log an info message
     *
     * @param message
     * @param saveToFile (default: false) Whether to save the log to a file
     *
     * @return void
     */
    public static info(message: string, saveToFile: boolean = false): void {
        this.logMessage('INFO', message, saveToFile)
    }

    /**
     * Log a warning message
     *
     * @param message
     * @param saveToFile (default: false) Whether to save the log to a file
     *
     * @return void
     */
    public static warning(message: string, saveToFile: boolean = false): void {
        this.logMessage('WARNING', message, saveToFile)
    }

    /**
     * Log an error message
     *
     * @param message
     * @param saveToFile (default: false) Whether to save the log to a file
     *
     * @return void
     */
    public static error(message: string, saveToFile: boolean = false): void {
        this.logMessage('ERROR', message, saveToFile)
    }
}

export { Log }
