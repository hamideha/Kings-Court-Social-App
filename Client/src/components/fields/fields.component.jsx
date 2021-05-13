export const TextArea = ({ value, required, onChange }) => {
    return (
        <textarea className="w-full h-52 resize-none mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required={required}
            value={value} onChange={onChange}
        />
    )
}