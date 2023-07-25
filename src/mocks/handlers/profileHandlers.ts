import { rest } from 'msw';

import { ApiKeys, ApiUrls, baseUrl } from '@constants/apiConstants';

import { Profile } from '@src/types/profile';

import profileResponse from '../profileResponse.json';

export const profileHandlers = [
  rest.get(`${baseUrl}${ApiUrls[ApiKeys.PROFILE]}`, (_req, res, ctx) => {
    const responseData = profileResponse as Profile;
    return res(ctx.status(200), ctx.delay(500), ctx.json(responseData));
  }),
];
