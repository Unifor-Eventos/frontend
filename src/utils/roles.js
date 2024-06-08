export const ADMIN = 1;
export const ORGANIZER = 2;

export const hasRole = (user, roleId) => !!user.roles.find(role => role.id === roleId)
export const isAdmin = (user) => hasRole(user, ADMIN)
export const isOrganizer = (user) => isAdmin(user) || hasRole(user, ORGANIZER);



