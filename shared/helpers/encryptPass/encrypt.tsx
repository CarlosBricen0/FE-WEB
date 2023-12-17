import bcrypt from 'bcryptjs'

export const saltRounds = parseInt(
  process?.env?.NEXT_PUBLIC_SALT_ROUNDS || '11'
)
export const encryptPass = async (plainPassword: string): Promise<string> => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds)
    console.log(
      `Contraseña encriptada:' ${hashedPassword}  salts : ${saltRounds} `
    )
    return hashedPassword
  } catch (err) {
    console.error('Error : ' + err)
    throw err
  }
}

export const decryptPass = async (
  userEnteredPassword: string,
  savedHashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(
      userEnteredPassword,
      savedHashedPassword
    )
    console.log('Contraseña válida ' + isMatch)
    return isMatch
  } catch (error) {
    console.log('Contraseña incorrecta')
    throw error
  }
}
