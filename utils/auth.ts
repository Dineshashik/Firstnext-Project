

// Define your user roles
export type UserRole = 'INVESTOR' | 'FOUNDER' | 'ADMIN';

// Define a function to check if the user has the required role
export const checkUserRole = (userRole: UserRole, userRoleFromRedux: UserRole): boolean => {
    const storedUserRole = userRoleFromRedux;
    return storedUserRole === userRole;
};
