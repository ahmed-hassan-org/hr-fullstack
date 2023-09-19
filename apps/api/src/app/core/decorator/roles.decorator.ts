import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { HrRoles } from '../security/model/HrRoles.enum';

export const Roles = (...roles: string[]): CustomDecorator => {
  return SetMetadata('roles', roles);
};
