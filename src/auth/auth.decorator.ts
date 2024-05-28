import { UseGuards, applyDecorators } from '@nestjs/common';
import { VALID_ROLE } from './interfaces/user-role.interface';
import { RolProtected } from './decorators/rol-protected/rol-protected.decorator';
import { UserRoleGuard } from './guards/userrole/user-role.guard';
import { AuthGuard } from '@nestjs/passport';

export function Auth(...roles: VALID_ROLE[]) {
  return applyDecorators(
    //RolProtected Este decorador se encarga de mandar por metadata los roles
    RolProtected(...roles),
    UseGuards(AuthGuard(),UserRoleGuard)
  );
}