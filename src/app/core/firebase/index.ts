import { AuthService } from './auth.service';
import { CharacterService } from './character.service';

export * from './auth.service';

export const API_SERVICES = [
    AuthService,
    CharacterService
];
