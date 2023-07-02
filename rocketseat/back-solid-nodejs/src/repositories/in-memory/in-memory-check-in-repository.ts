import dayjs from 'dayjs'
import { Prisma, CheckIn } from '@prisma/client'
import { ICheckInRepository } from '../ICheck-in-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInRepository implements ICheckInRepository {
  public items: CheckIn[] = []

  async save(checkIn: CheckIn) {
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)
    if (checkInIndex >= 0) {
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.createdAt)
      const isOnSameDay =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
      return checkIn.user_id === userId && isOnSameDay
    })
    if (!checkIn) {
      return null
    }
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20) // 20 itens por pagina
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      createdAt: new Date(),
    }

    this.items.push(checkIn)
    return checkIn
  }

  async findById(id: string) {
    const checkin = this.items.find((item) => item.id === id)
    if (!checkin) {
      return null
    }
    return checkin
  }

  async countByUserId(userId: string) {
    return this.items.filter((item) => item.user_id === userId).length
  }
}
