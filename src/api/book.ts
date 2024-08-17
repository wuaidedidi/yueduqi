// 获取小说章节内容的 API
import { http } from '@/utils/http'

// 获取章节列表的 API 调用
export const getChaptersAPI = async () => {
  return http<{ id: string; title: string }[]>({
    url: '/api/novel/chapters',
    method: 'GET',
  })
}

// 获取章节内容的 API 调用
export const getChapterContentAPI = async (fileName: string, chapterId: string, page: number, pageSize: number) => {
  return http<string>({
    url: `/api/novel/chapter`,
    method: 'POST',
    data: {
      fileName,
      chapterId,
      page,
      pageSize,
    },
  })
}
// 获取书源的 API 调用
export const getbookSourceDataApi = async () => {
  return http<string>({
    url: '/api/bookSource',
    method: 'POST',
  })
}
