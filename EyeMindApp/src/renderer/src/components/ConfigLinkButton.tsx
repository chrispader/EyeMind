import { Link } from '@tanstack/react-router'

type ConfigLinkButtonProps = React.ComponentProps<typeof Link> & {
  configClass: string
}

function ConfigLinkButton({
  to,
  configClass,
  children,
  ...props
}: ConfigLinkButtonProps) {
  return (
    <Link to={to} className={`config-button ${configClass}`} {...props}>
      {children}
    </Link>
  )
}

export default ConfigLinkButton
