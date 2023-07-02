// const {MongoClient} = require('mongodb')
// const LoadUserByEmailRepository = require("./load-user-by-email-repository");

// describe('LoadUserByEmail Repository', function () {
//     it('should return null if no user if found', async () => {
//         const sut = new LoadUserByEmailRepository()
//         const user = await sut.load('invalid_email@mail.com')
//         expect(user).toBeNull()
//     });

//     it('should return an user if an user is found', async () => {
//         const sut = new LoadUserByEmailRepository(userModel)
//         const user = await sut.load('valid_email@mail.com')
//         expect(user.email).toBe('valid_email@mail.com')
//     });
// });