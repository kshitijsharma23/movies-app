import { movieHandlers } from './movieHandlers';
import { profileHandlers } from './profileHandlers';

export const handlers = [...movieHandlers, ...profileHandlers];
