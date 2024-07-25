// services/hashPassword.ts

const encode = (data: string) => new TextEncoder().encode(data);
const decode = (data: Uint8Array) => new TextDecoder().decode(data);

export async function hashPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + salt); // Combine password with salt

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
}

export async function verifyPassword(inputPassword: string, storedHash: string, salt: string): Promise<boolean> {
    const inputHash = await hashPassword(inputPassword, salt);
    return inputHash === storedHash;
}

