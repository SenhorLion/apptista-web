import { prisma } from '@/lib/prisma';

export const validateEmailVerificationCode = async (
  code: string,
  userId: string,
  email: string
) => {
  const emailVerificationToken = await prisma.emailVerificationToken.findFirst({
    where: {
      userId,
    },
  });

  if (!emailVerificationToken || emailVerificationToken.code !== code) {
    return false;
  }

  // Delete the token
  await prisma.emailVerificationToken.delete({
    where: {
      id: emailVerificationToken.id,
    },
  });

  const isExpired = Date.now() > emailVerificationToken.expiresAt.getTime();

  if (isExpired) {
    return false;
  }

  // Finally check the user email match
  if (emailVerificationToken.email !== email) {
    return false;
  }

  return true;
};
