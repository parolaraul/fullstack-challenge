import { CustomLogger } from './logger.service';

describe('CustomLogger', () => {
  let customLogger: CustomLogger;

  beforeEach(() => {
    customLogger = new CustomLogger();
  });

  it('should log an error message', () => {
    const spyConsoleError = jest.spyOn(console, 'error');
    const errorMessage = 'This is an error message';
    customLogger.error(errorMessage);
    expect(spyConsoleError).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] ERROR \[\] This is an error message/),
    );
  });

  it('should log an info message', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    const infoMessage = 'This is an info message';
    customLogger.log(infoMessage);
    expect(spyConsoleLog).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] INFO \[\] This is an info message/),
    );
  });

  it('should log a warning message', () => {
    const spyConsoleWarn = jest.spyOn(console, 'warn');
    const warningMessage = 'This is a warning message';
    customLogger.warn(warningMessage);
    expect(spyConsoleWarn).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] WARN \[\] This is a warning message/),
    );
  });

  it('should log a debug message', () => {
    const spyConsoleLog = jest.spyOn(console, 'debug');
    const debugMessage = 'This is a debug message';
    customLogger.debug(debugMessage);
    expect(spyConsoleLog).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] DEBUG \[\] This is a debug message/),
    );
  });

  it('should log a verbose message', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    const verboseMessage = 'This is a verbose message';
    customLogger.verbose(verboseMessage);
    expect(spyConsoleLog).toHaveBeenCalledWith(
      expect.stringMatching(/\[.*\] VERBOSE \[\] This is a verbose message/),
    );
  });
});
