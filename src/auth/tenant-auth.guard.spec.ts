import { TenantAuthGuard } from './tenant-auth.guard';
import { AuthService } from './auth.service';

describe('TenantAuthGuard', () => {
    let authServiceMock: Partial<AuthService>;

    beforeEach(() => {
        authServiceMock = {
            // Mock methods of AuthService as needed
        };
    });

    it('should be defined', () => {
        const guard = new TenantAuthGuard(authServiceMock as AuthService);
        expect(guard).toBeDefined();
    });
});
