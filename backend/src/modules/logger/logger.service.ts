import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  private static LOG_PATTERN = (
    context: string,
    date: Date,
    message: any,
    ...optionalParams: any[]
  ) =>
    `[${date.toISOString()}] ${context} [${optionalParams.join(
      ' - ',
    )}] ${message}`;

  error(message: any, ...optionalParams: any[]) {
    console.error(
      CustomLogger.LOG_PATTERN('ERROR', new Date(), message, optionalParams),
    );
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(
      CustomLogger.LOG_PATTERN('INFO', new Date(), message, optionalParams),
    );
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(
      CustomLogger.LOG_PATTERN('WARN', new Date(), message, optionalParams),
    );
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(
      CustomLogger.LOG_PATTERN('DEBUG', new Date(), message, optionalParams),
    );
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.log(
      CustomLogger.LOG_PATTERN('VERBOSE', new Date(), message, optionalParams),
    );
  }
}
