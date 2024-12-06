import { decrypt, encrypt } from "~/services/encryption";

const secret = 'secret';

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const name = url.searchParams.get('name') || 'world';

  const message = `hello ${name}`;
  const encrypted = encrypt(secret, message);
  const decrypted = decrypt(secret, encrypted);

  return Response.json({ message, encrypted, decrypted });
}
