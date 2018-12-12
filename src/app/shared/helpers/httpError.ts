export class HttpError {
    static parse(error: any): string {
        let message = 'error occured';
        if (!error) {
            return message;
        }
        if (error.message) {
            message = error.message;
        }
        if (error.status) {
            message = `error occured with status: ${error.status}`;
        }
        if (error.name) {
            message = `error occured: ${error.name}`;
        }
        return message;
    }
}
