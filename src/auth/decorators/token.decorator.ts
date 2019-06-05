import { createParamDecorator } from '@nestjs/common';

export const AccessToken = createParamDecorator((data, req) => {
  return req.headers['access_token'];
});