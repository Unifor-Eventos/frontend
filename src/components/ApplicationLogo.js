import Image from 'next/image'

const ApplicationLogo = ({ height, width }) => (
    <Image
        src="/logo.svg"
        width={width || 250}
        height={height || 250}
        className="fill-current"
        alt="Unifor logo"
    />
)

export default ApplicationLogo
