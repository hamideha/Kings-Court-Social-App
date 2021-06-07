import { useState, useCallback } from 'react'

export const useAsyncError = () => {
    // eslint-disable-next-line
    const [_, setError] = useState();
    return useCallback(
        e => {
            setError(() => {
                throw e;
            });
        },
        [setError],
    );
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div>
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}

export default ErrorFallback