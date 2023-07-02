
// class UpdateAccessTokenRepository {
//   async update(id, token) {
//     return true;
//   }
// }

// const makeSut = () => {
//   const sut = new UpdateAccessTokenRepository();
//   return sut
// }

// describe('Update Access token Repository', () => {
//   it('Should update the user with the given accessToken', async () => {
//     const sut = makeSut()
//     const userModel = 'any_model'
//     const fakeUser = {
//       id: 'any_id',
//       name: 'any_name',
//       email: 'user@mail.com',
//       password: 'hashed_password',
//     }
//     const userFake = await userModel.insertOne(fakeUser)
//     await sut.update(userFake.id, 'valid_token')
//     const updateFakeUser = await userModel.findOne({ _id: userFake._id })
//     expect(user.accessToken).toBe('valid_token')
//   });

//   it('Should update the user with the given accessToken', () => {
//     const sut = makeSut()
//     const promise = sut.update('any_id', 'any_token')
//     expect(promise).resolves.toBeTruthy()
//   });

// });