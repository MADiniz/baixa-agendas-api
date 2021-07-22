import fs from "fs/promises";
import logPath from "@config/logPath";
import DateConverter from "@shared/utils/DateConverter";
import ILog from "./ILog";

class AppLog implements ILog {
    public readonly message: string;

    private filePath: string = logPath.tempFolder;

    constructor(date: Date, message: string) {
        this.message = message;
        this.save(date, this.message);
    }

    public async save(date: Date, content: string): Promise<void> {
        const contentLoaded = await this.load();
        const log = `${DateConverter.paraTexto(
            date,
        )} -------------------------------------------------------------------------- ${content}`;
        return contentLoaded.length === 0
            ? fs.writeFile(logPath.tempFolder, log)
            : fs.appendFile(logPath.tempFolder, `\n${log}`);
    }

    public async load(): Promise<string> {
        const fileBuffer = fs.readFile(logPath.tempFolder, "utf-8");
        return fileBuffer;
    }
}

export default AppLog;
