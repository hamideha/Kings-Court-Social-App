import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import { motion } from 'framer-motion'

const LikeButton = ({ onClick, likes, isLikedByUser }) => {
    return (
        <>
            <div className="h-7 w-7 rounded-full flex flex-row justify-center items-center hover:bg-blue-100" onClick={onClick}>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isLikedByUser ? <HeartIconSolid className="h-5 w-5 text-red-600" /> : <HeartIcon className="h-5 w-5 text-blue-600" />}
                </motion.div>
            </div>
            <p className="text-grey-dark font-light prose flex items-center px-1 select-none">{likes}</p>
        </>
    )
}

export default LikeButton