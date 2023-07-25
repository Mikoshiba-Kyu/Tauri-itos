import dayjs from 'dayjs'

export const getDataTimeNow = () => {
  return dayjs().format('YYYY-MM-DD HH:mm:ss')
}
