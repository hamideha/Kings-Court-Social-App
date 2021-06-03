export const detectBottomScroll = ({ target }, callback) => {
    if (target.offsetHeight + target.scrollTop >= target.scrollHeight - 2) {
        callback()
    }
}