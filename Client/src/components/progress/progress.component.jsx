import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressCircle = ({ progress, maxValue, text }) => {
    return (
        <div className="text-progress-circle mt-3" style={{ width: 50, height: 50 }}>
            <CircularProgressbar value={progress} maxValue={maxValue} text={text}
                styles={buildStyles({
                    pathTransitionDuration: 0.1,
                    textColor: progress <= maxValue ? `rgb(0, 0, 0)` : `rgb(207, 43, 43)`,
                    pathColor: progress <= maxValue ? `rgba(79, 70, 229, ${progress / maxValue})` : `rgb(207, 43, 43)`,
                    trailColor: '#d6d6d6',
                })}
            />
        </div>
    )
}

export default ProgressCircle