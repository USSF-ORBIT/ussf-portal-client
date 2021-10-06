import { render, RenderOptions } from '@testing-library/react'

export const renderWithModalRoot = (
  ui: React.ReactElement,
  options: RenderOptions = {}
) => {
  const modalContainer = document.createElement('div')
  modalContainer.setAttribute('id', 'modal-root')

  return render(ui, {
    ...options,
    container: document.body.appendChild(modalContainer),
  })
}
