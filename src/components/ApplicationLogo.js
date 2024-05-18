import Image from 'next/image'

const ApplicationLogo = props => (
    <Image
        src="/logo.svg"
        width={250}
        height={250}
        alt="Unifor logo"
    />
)

export default ApplicationLogo
