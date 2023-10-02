import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const requestId = randomUUID();
    request.headers['x-req-id'] = requestId;
    response.set('x-req-id', requestId);
    const { ip, method, path, url, baseUrl } = request;
    const userAgent = request.get('user-agent') || '';
    const apiVersion = request.get('x-api-version') || '';

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(
        `[${requestId}] [${apiVersion}] ${method} ${baseUrl} ${url} ${path} ${statusCode} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
