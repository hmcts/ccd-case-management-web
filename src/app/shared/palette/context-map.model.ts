export class ContextMap {
    private data: Map<string, string>;

    public constructor() {
        this.data = new Map<string, string>();
    }

    public set(key: string, value: string): void {
        this.data.set(key, value);
    }

    public get(key: string): string {
        return this.data.get(key);
    }

    public remove(key: string): string {
        let value = this.data.get(key);
        this.data.delete(key);
        return value;
    }
}
