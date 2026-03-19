export const homePath = () => '/';
export const lessonsPath = () => '/';
export const lessonsPathForOrganization = (organizationId: string) =>
  `/?organizationId=${organizationId}`;
// export const lessonsPath = () => '/lessons';

// TODO: Remove all extraneous paths
export const ticketsPath = () => '/tickets';
export const ticketsOrganizationPath = () => '/tickets/organization';
export const ticketPath = (ticketId: string) => `/tickets/${ticketId}`;
export const ticketEditPath = (ticketId: string) => `/tickets/${ticketId}/edit`;

export const signUpPath = () => '/sign-up';
export const signInPath = () => '/sign-in';
export const passwordForgotPath = () => '/password-forgot';
export const passwordResetPath = () => '/password-reset';

export const emailVerifyPath = () => '/email-verify';

export const accountPath = () => '/account';
export const accountProfilePath = () => '/account/profile';
export const accountPasswordPath = () => '/account/password';

export const organizationPath = () => '/organization';
export const organizationCreatePath = () => '/organization/create';
export const organizationAdminPath = (organizationId: string) =>
  `/organization/${organizationId}`;
export const membershipsPath = (organizationId: string) =>
  `/organization/${organizationId}/memberships`;

export const onboardingPath = () => '/onboarding';
export const selectActiveOrganizationPath = () => '/onboarding/select-active-organization';
