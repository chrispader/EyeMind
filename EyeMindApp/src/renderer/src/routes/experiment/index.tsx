import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/experiment/')({
  component: ExperimentIndexPage,
})

/**
 * Index route for /experiment. The experiment layout shows the main UI;
 * this component renders in the layout's outlet and shows nothing so the layout content is the only visible content.
 */
function ExperimentIndexPage(): React.ReactElement {
  return <></>
}
