import { z } from "zod";

const EmailSchema = z.string().email();

export function normalizeGmail(email: string): string {
  if (!EmailSchema.safeParse(email).success) {
    throw new Error("Invalid email address");
  }

  const [localPart, domain] = email.split("@");
  if (domain.toLowerCase() !== "gmail.com") {
    throw new Error("Not a Gmail address");
  }

  const normalizedLocalPart = localPart
    .split("+")[0]
    .replace(/\./g, "")
    .toLowerCase();

  return `${normalizedLocalPart}@gmail.com`;
}

export function isGmailSimilar(email1: string, email2: string): boolean {
  try {
    const normalizedEmail1 = normalizeGmail(email1);
    const normalizedEmail2 = normalizeGmail(email2);
    return normalizedEmail1 === normalizedEmail2;
  } catch (error) {
    return false;
  }
}
