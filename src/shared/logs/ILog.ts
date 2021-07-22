export default interface ILog {
    save(date: Date, content: string): Promise<void>;
    load(): Promise<string>;
}
