export const detectScrollEnd = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
        console.log("At The Bottom"); //Add in what you want here
    }

    return bottom
}