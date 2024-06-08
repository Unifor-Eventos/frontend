const Label = ({ className, children, ...props }) => (
    <label
        className={`${className} block font-bold text-sm text-gray-700`}
        {...props}>
        {children}
    </label>
)

export default Label
