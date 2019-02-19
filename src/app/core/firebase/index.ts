import { AuthService } from './auth.service';
import { CharacterService } from './character.service';
import { AdventureService } from './adventure.service';

export * from './auth.service';

export const API_SERVICES = [
    AuthService,
    CharacterService,
    AdventureService
];
