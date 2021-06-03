const Spinner = () => {
    return (
        <div className="w-full flex items-center justify-center my-3">
            <div style={{ borderTopColor: "transparent" }} className="border-solid animate-spin rounded-full border-indigo-400 border-8 h-16 w-16"></div>
        </div>
    )
}

export default Spinner