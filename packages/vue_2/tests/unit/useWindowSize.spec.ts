import useWindowSize from '@/shared/useWindowSize'
import { sleep } from 'tests/shared/utils'

describe('useWindowSize', () => {
  const addEventListenerSpy = jest.spyOn(window, 'addEventListener')
  const matchMediaSpy = jest.spyOn(window, 'matchMedia').mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }))

  beforeEach(() => {
    addEventListenerSpy.mockClear()
    matchMediaSpy.mockClear()
  })

  afterAll(() => {
    addEventListenerSpy.mockRestore()
    matchMediaSpy.mockRestore()
  })

  it('should work', () => {
    const { width, height } = useWindowSize()

    expect(width.value).toBe(window.innerWidth)
    expect(height.value).toBe(window.innerHeight)
  })

  it('sets handler for window "resize" event', async () => {
    useWindowSize()

    await sleep(0)

    expect(addEventListenerSpy).toBeCalledTimes(1)

    const call = addEventListenerSpy.mock.calls[0]
    expect(call[0]).toEqual('resize')
    expect(call[2]).toEqual({ passive: true })
  })
})
