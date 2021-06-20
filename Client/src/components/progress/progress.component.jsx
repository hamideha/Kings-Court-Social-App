import { motion, useSpring, useTransform, useMotionValue } from "framer-motion"

const ProgressCircle = ({ progress, maxValue, text }) => {
    const initialValue = useMotionValue(0)
    const progressPercent = useTransform(initialValue, () => progress / maxValue);
    const pathLength = useSpring(progressPercent, { stiffness: 400, damping: 90 });

    return (
        <svg className="flex justify-center align-center mt-3" width="50px" height="50px">
            <motion.path
                className="justify-self-center"
                fill="none"
                strokeWidth="5"
                stroke={progress <= maxValue ? `rgba(79, 70, 229, ${progress / maxValue})` : `rgb(207, 43, 43)`}
                strokeDasharray="0 1"
                d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
                style={{
                    pathLength,
                    rotate: 90,
                    translateX: 5,
                    translateY: 5,
                    scaleX: -1
                }}
            />
            <text x="50%" y="48%" textAnchor="middle" dominantBaseline="central" style={{ fontSize: '8px' }} fill={progress <= maxValue ? `black` : `rgb(207, 43, 43)`}>
                {text}
            </text>
        </svg>
    )
}

export default ProgressCircle