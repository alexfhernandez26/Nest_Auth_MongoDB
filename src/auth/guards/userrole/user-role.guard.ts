import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators/rol-protected/rol-protected.decorator';
import { User } from 'src/auth/entities/user.entity';
import { VALID_ROLE } from 'src/auth/interfaces/user-role.interface';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles : string[] = this.reflector.get(META_ROLES,context.getHandler());
    var req = context.switchToHttp().getRequest();
    var user = req.user as User
    for(const role of user.roles)
    {
      if(validRoles.includes(role)) return true;
    }

    throw new ForbiddenException(`the user ${user.fullname} has not the roles ${validRoles}`);
  }
}
