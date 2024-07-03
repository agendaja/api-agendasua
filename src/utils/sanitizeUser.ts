import { Prisma } from "@prisma/client";

export function sanitizeUser(user: Prisma.UserGetPayload<{ include: { integration: true } }> | null) {

  if (user)
    return {
      name: user.name,
      email: user.email,
      admin: user.admin,
      avatar_url: null,
      phone: user.phone,
      document: user.document,
      integration: user.integration
    }
}
