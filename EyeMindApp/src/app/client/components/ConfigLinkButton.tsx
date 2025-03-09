import { NavLink } from 'react-router'

type ConfigLinkButtonProps = React.ComponentProps<typeof NavLink> & {
  configClass: string
}

function ConfigLinkButton({
  to,
  configClass,
  children,
  ...props
}: ConfigLinkButtonProps) {
  return (
    <NavLink to={to} className={`config-button ${configClass}`} {...props}>
      {children}
    </NavLink>
  )
}

export default ConfigLinkButton
