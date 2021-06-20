import { HeartIcon } from '@heroicons/react/outline'


const LikeButton = ({ onClick, likes }) => {
    return (
        <>
            <div className="h-7 w-7 rounded-full flex flex-row justify-center items-center hover:bg-blue-100" onClick={onClick}>
                <HeartIcon className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-grey-dark font-light prose flex items-center px-1">{likes}</p>
        </>
    )
}

export default LikeButton