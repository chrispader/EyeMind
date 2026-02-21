import React, { useMemo } from 'react'

type SpacerProps = React.HTMLProps<HTMLDivElement> &
  (
    | {
        horizontal: number | 'stretch'
      }
    | {
        vertical: number | 'stretch'
      }
  )

const SpacerImpl: React.FC<SpacerProps> = (props) => {
  const style = useMemo(() => {
    const { key, value } =
      'horizontal' in props
        ? ({
            key: 'width',
            value: props.horizontal,
          } as const)
        : ({
            key: 'height',
            value: props.vertical,
          } as const)

    if (typeof value === 'number') return { ...props.style, [key]: value, flexShrink: 0 }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    else if (value === 'stretch') return { ...props.style, flex: 1, flexShrink: 0 }
    else throw new Error(`Invalid ${key} passed! ${value}`)
  }, [props])

  return <div {...props} style={style} />
}

export const Spacer = React.memo(SpacerImpl)
