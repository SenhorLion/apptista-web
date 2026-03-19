import { prisma } from '@/lib/prisma';
import { generateRandomCode } from '@/utils/crypto';

const EMAIL_VERIFICATION_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutes

export const generateVerificationCode = async (userId: string, userEmail: string) => {
  // First, delete any existing verification tokens for the user
  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  // Then, generate a new code
  const code = generateRandomCode();

  // Save the code to the database
  await prisma.emailVerificationToken.create({
    data: {
      code,
      email: userEmail,
      userId,
      expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_EXPIRATION_TIME),
    },
  });

  return code;
};
