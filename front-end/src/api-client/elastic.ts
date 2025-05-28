import { API } from './api'

export type Result = {
  _id: number
  title: string
  url: string
  content: string
  reading_time: number
  access_count: number
  dt_creation: string
}

export type Results = {
  total: number
  results: Result[]
}

export const getMostViewedDocs = async (limit: number): Promise<Result[]> => {
  const response = await API.get(`/wikipedia/mostViews/${limit}`)
  return response.data
}

export const searchDocs = async (
  query: string,
  page: number,
  pageSize: number
): Promise<Results> => {
  const response = await API.get(
    `/wikipedia/search?query=${query}&page=${page}&pageSize=${pageSize}`
  )
  return response.data
}

export const addNumViewDoc = async (id: string) => {
  await API.get(`/wikipedia/increment/${id}`)
}
