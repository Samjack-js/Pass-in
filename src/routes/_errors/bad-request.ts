export class badRequest extends Error {
    constructor(message: string) {
        super(message);
        this.name = "badRequest"; 
    }
}
