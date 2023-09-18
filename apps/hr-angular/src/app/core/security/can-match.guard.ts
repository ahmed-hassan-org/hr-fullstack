import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LocalStorageKeys } from '@hrCore/models/enum/LocalStorageKeys.enum';
import { AuthService } from '@hrServices/auth.service';

export const canMatchGuard: CanMatchFn = async (route, segments) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const isExpire = await authService.checkTokenExpired();

  if (!isExpire) {
    router.navigate(['/auth']);
    return false;
  }
  return true;
};
