import { format } from 'date-fns'
import fs from 'fs'
import path from 'path'
import pc from 'picocolors'

type LogLevel = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR'

class Log {
    private static logsDir = path.join(process.cwd(), 'logs')

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

    /**
     * Write a log message to a file
     *
     * @param level
     * @param message
     *
     * @return void
     *
     */
    public static writeToFile(level: LogLevel, message: string): void {
        const formattedMessage = this.getFormattedMessage(level, message)

        this.ensureLogDirectoryExists()
        const logFilePath = path.join(this.logsDir, this.getLogFileName())
        fs.appendFile(logFilePath, formattedMessage + '\n', error => {
            if (error) {
                console.error(pc.red('Failed to write to log file:'), error)
            }
        })
    }

    private static logMessage(level: LogLevel, message: string, saveToFile: boolean = false): void {
        const formattedMessage = this.getFormattedMessage(level, message)

        // Log to console
        console.log(this.getColoredMessage(level, formattedMessage))

        // Optionally save to log file
        if (saveToFile) {
            this.writeToFile(level, message)
        }
    }

    private static getFormattedMessage(level: LogLevel, message: string) {
        return `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')} [${level}] - ${message}`
    }

    private static ensureLogDirectoryExists(): void {
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir, { recursive: true })
        }
    }

    private static getLogFileName(): string {
        return format(new Date(), 'yyyy-MM-dd') + '.log'
    }

    private static getColoredMessage(level: string, message: string) {
        let coloredMessage: string
        switch (level) {
            case 'SUCCESS':
                coloredMessage = pc.green(message)
                break
            case 'INFO':
                coloredMessage = pc.blue(message)
                break
            case 'WARNING':
                coloredMessage = pc.yellow(message)
                break
            case 'ERROR':
                coloredMessage = pc.red(message)
                break
            default:
                coloredMessage = message
                break
        }

        return coloredMessage
    }
}

export { Log }
