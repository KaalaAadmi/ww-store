export const ME_USER = `
query MeUser {
    meUser {
        collection
        exp
        strategy
        token
        user {
            id
            updatedAt
            createdAt
            email
            resetPasswordToken
            resetPasswordExpiration
            salt
            hash
            loginAttempts
            lockUntil
            password
        }
    }
}
`
