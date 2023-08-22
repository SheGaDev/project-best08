import TastyTreatsAPI from '@api/TastyTreats';
import { categoriesRendering } from './categoriesRendering';
import { popularRendering } from './popular';
export const API = new TastyTreatsAPI();
categoriesRendering();
popularRendering();

