import { Heart } from 'react-feather';
import { motion } from 'framer-motion'

const LikeButton = ({ onClick, likes, isLikedByUser }) => {
    return (
        <>
            <div className="h-7 w-7 rounded-full flex flex-row justify-center items-center hover:bg-blue-100" onClick={onClick}>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isLikedByUser ? <Heart className="h-4 w-4 text-red-500 fill-current" /> : <Heart className="h-4 w-4 text-blue-600" />}
                </motion.div>
            </div>
            <p className="text-grey-dark font-light prose flex items-center px-1 select-none">{likes}</p>
        </>
    )
}

export default LikeButton