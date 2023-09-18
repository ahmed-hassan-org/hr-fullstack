import {
  CustomDecorator,
  SetMetadata,
} from '@nestjs/common';
import { HrRoles } from '../security/model/HrRoles.enum';

export const Roles = (...roles: HrRoles[]): CustomDecorator<typeof HrRoles> =>
  SetMetadata(HrRoles, roles);
