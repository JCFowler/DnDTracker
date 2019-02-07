import { LoggerService } from './logger.service';
import { NavigationService } from './navigation.service';
import { AuthGuard } from './auth-guard.service';

export * from './logger.service';
export * from './navigation.service';
export * from './auth-guard.service';
export * from './server-error-handler.service';

export const CORE_SERVICES = [
    AuthGuard,
    LoggerService,
    NavigationService
];
