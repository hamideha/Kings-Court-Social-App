const Spinner = () => {
    return (
        <div className="right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 ">
            <div style={{ borderTopColor: "transparent" }} className="border-solid animate-spin rounded-full border-indigo-400 border-8 h-16 w-16"></div>
        </div>
    )
}

export default Spinner