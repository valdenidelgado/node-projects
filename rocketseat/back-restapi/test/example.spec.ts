import { afterAll, beforeAll, expect, it, describe, beforeEach } from 'vitest'
import request from 'supertest'
import app from '../src/app'
import { execSync } from 'child_process'

describe('Name of the group', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run migrate:rollback')
    execSync('npm run migrate')
  })

  it('user bla', async () => {
    const response = await request(app.server).get('/')
    expect(response.status).toEqual(200)
  })

  it('get cookies', async () => {
    const response = await request(app.server).get('/')
    expect(response.headers['set-cookie']).toBeDefined()
  })

  it('get cookies 2', async () => {
    const response = await request(app.server).get('/')
    const cookies = response.get('Set-cookie')
    await request(app.server).get('/').set('Cookie', cookies).expect(200)
  })

  it.todo('user bla bla') // TODO marca para fazer um novo teste futuro
})
