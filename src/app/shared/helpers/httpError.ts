import { ErrorMessage } from '../models/errorMessage.model';

export class HttpError {
    static parse(error: any): ErrorMessage {
        const errorMessage: ErrorMessage = {
            message: 'error occured'
        };

        if (!error) {
            return errorMessage;
        }
        if (error.message) {
            errorMessage.message = error.message;
        }
        if (error.status) {
            errorMessage.message = `error occured with status: ${error.status}`;
        }
        if (error.name) {
            errorMessage.message = `error occured: ${error.name}`;
        }
        return errorMessage;
    }
}
