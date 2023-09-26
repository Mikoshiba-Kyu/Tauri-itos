import { render, screen } from '@testing-library/react'

import BlankContents from '../BlankContents'

describe('BlankContents', () => {
  test('The value of props should be displayed.', () => {
    render(<BlankContents message="test" />)

    expect(screen.getByText('test')).toBeInTheDocument()
  })
})
