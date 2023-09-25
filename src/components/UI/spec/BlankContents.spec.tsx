import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { randomFillSync } from 'node:crypto'
import { mockWindows } from '@tauri-apps/api/mocks'

import BlankContents from '../BlankContents'

beforeAll(() => {
  window.crypto = {
    // @ts-ignore
    getRandomValues: (buffer: NodeJS.ArrayBufferView) => {
      return randomFillSync(buffer)
    },
  }
})

describe('test', () => {
  // 通る
  test('mock window', async () => {
    mockWindows('itos')
    const { getCurrent } = await import('@tauri-apps/api/window')
    expect(getCurrent()).toHaveProperty('label', 'itos')
  })

  // 通らない
  test('renders BlankContents component', () => {
    render(<BlankContents message="test" />)
  })
})
