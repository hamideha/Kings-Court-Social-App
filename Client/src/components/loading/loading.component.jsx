import AnimatedLogo from '../../assets/Animated Logo.svg'

const LoadingElement = () => {
    return (
        <div className="bg-gray-800 w-full h-full flex justify-center items-center overflow-hidden">
            <img
                className="block h-40 w-auto"
                src={AnimatedLogo}
                alt="Loading"
            />
        </div>
    )
}

export default LoadingElement