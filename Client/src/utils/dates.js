import dayjs from 'dayjs'

export const getFormatted = (date) => {
    const formatted = new Date(date)
    return dayjs(formatted).format('MMM D, YYYY @ h:mm A')
}

export const getFormattedDate = (date) => {
    const formatted = new Date(date)
    return dayjs(formatted).format('MMM D, YYYY')
}