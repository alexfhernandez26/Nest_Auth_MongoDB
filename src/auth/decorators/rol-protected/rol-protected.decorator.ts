import { SetMetadata } from '@nestjs/common';
import { VALID_ROLE } from 'src/auth/interfaces/user-role.interface';

export const META_ROLES = 'roles'
export const RolProtected = (...args: VALID_ROLE[]) => {

   return SetMetadata(META_ROLES, args);
}
