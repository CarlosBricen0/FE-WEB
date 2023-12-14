import bcrypt from 'bcryptjs'
import { encryptPass,decryptPass } from './encrypt';


describe('Encryption Functions', () => {
  it('should encrypt a password', async () => {
    const plainPassword = 'myPassword';
    const hashedPassword = await encryptPass(plainPassword);
    expect(hashedPassword).not.toBe(plainPassword); // Check if the password is encrypted
  });

  it('should decrypt a valid password', async () => {
    const plainPassword = 'myPassword';
    const hashedPassword = await encryptPass(plainPassword);

    const isMatch = await decryptPass(plainPassword, hashedPassword);
    
    expect(isMatch).toBe(true); // Check if the decryption matches the original password
  });

  it('should reject an invalid password', async () => {
    const plainPassword = 'myPassword';
    const hashedPassword = await  bcrypt.hash(plainPassword, 10);
    const isMatch = await decryptPass('wrongPassword', hashedPassword);
    expect(isMatch).toBe(false); // Check if the decryption rejects the wrong password
  });
});
