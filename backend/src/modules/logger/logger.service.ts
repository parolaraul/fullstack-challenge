import {ConsoleLogger, Injectable} from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger {

    private static printMessage(context: string, message: any, ...optionalParams: any[]) {
        const date = new Date();
        console.error(
            `[${date.toISOString()}] ${context} [${optionalParams.join(
                ' - ',
            )}] ${message}`,
        );
    }

    error(message: any, ...optionalParams: any[]) {
        CustomLogger.printMessage('ERROR', message, optionalParams);
    }

    log(message: any, ...optionalParams: any[]) {
        CustomLogger.printMessage('INFO', message, optionalParams);

    }

    warn(message: any, ...optionalParams: any[]) {
        CustomLogger.printMessage('WARN', message, optionalParams);
    }

    debug(message: any, ...optionalParams: any[]) {
        CustomLogger.printMessage('DEBUG', message, optionalParams);
    }

    verbose(message: any, ...optionalParams: any[]) {
        CustomLogger.printMessage('VERBOSE', message, optionalParams);
    }

}
