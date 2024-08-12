// withRoleAuthorization.tsx

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserRole, checkUserRole } from './auth';
import { useAppSelector } from '@/lib/hooks';

// Define the Higher Order Component
const withRoleAuthorization =
  (allowedRoles: UserRole[]) => (WrappedComponent: any) => {
    const HOCComponent = (props: any) => {
      const router = useRouter();
      const userRoleFromRedux = useAppSelector((state) => state.user);
      // useEffect(() => {
      //   // Check if the user role is allowed
      //   const isAuthorized = allowedRoles.some((role) =>
      //     checkUserRole(role, userRoleFromRedux)
      //   );

      //   if (!isAuthorized) {
      //     // Redirect to a restricted page or show an error message
      //     router.push('/unauthorized');
      //   }
      // }, []);

      // Render the wrapped component if authorized, otherwise null
      return <WrappedComponent {...props} />;
    };

    return HOCComponent;
  };

export default withRoleAuthorization;
