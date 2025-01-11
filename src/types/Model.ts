export type Model<T> = {
    id: number
    createdAt: string
    updatedAt: string
    deleted: boolean
} & T