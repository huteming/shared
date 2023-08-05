import useRequest from '../../src/shared/useRequest'
import { ref } from '@vue/composition-api'
import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

describe('useRequest', () => {
  it('should support run with params', async () => {
    const mockService = jest.fn().mockResolvedValue('async')

    const wrapper: any = mount({
      template: '<div>{{ data }}</div>',
      setup() {
        const { loading, data, run } = useRequest(mockService, {
          defaultParams: [1, '2', true],
        })
        return { loading, data, run }
      },
    })
    await flushPromises()

    expect(mockService).toBeCalledTimes(1)
    expect(mockService).lastCalledWith(1, '2', true)

    wrapper.vm.run(2, '3', false)
    await flushPromises()

    expect(mockService).toBeCalledTimes(2)
    expect(mockService).lastCalledWith(2, '3', false)
  })

  it('should support manual control call', async () => {
    const mockService = jest.fn().mockResolvedValue('hello')

    const wrapper: any = mount({
      template: '<div>{{ data }}</div>',
      setup() {
        const { loading, data, run } = useRequest(mockService, {
          manual: true,
        })
        return { loading, data, run }
      },
    })

    expect(mockService).toBeCalledTimes(0)
    expect(wrapper.vm.loading).toBe(false)

    wrapper.vm.run()
    await flushPromises()

    expect(mockService).toBeCalledTimes(1)
    expect(wrapper.html()).toContain('hello')
    expect(wrapper.vm.loading).toBe(false)
  })

  it('should callback "onSuccess" be invoked', async () => {
    const onSuccess = jest.fn()

    const wrapper = mount({
      template: '<div>{{ data }}</div>',
      setup() {
        const { loading, data } = useRequest(
          async () => {
            return 'hello'
          },
          {
            onSuccess: (data) => {
              onSuccess(data)
            },
          },
        )
        return { loading, data }
      },
    })
    await flushPromises()

    expect(onSuccess).toBeCalledTimes(1)
    expect(onSuccess).toBeCalledWith('hello')
  })

  it('should run immediately', async () => {
    const wrapper: any = mount({
      template: '<div>{{ data }}</div>',
      setup() {
        const { loading, data } = useRequest(
          async () => {
            return 'hello'
          },
          {
            initialData: 'default',
          },
        )
        return { loading, data }
      },
    })

    expect(wrapper.html()).toContain('default')
    expect(wrapper.vm.loading).toBe(true)

    await flushPromises()

    expect(wrapper.html()).toContain('hello')
    expect(wrapper.vm.loading).toBe(false)
  })

  it('should throw error', async () => {
    const onError = jest.fn()

    const wrapper: any = mount({
      template: '<div>{{ data }}</div>',
      setup() {
        const { loading, data } = useRequest(
          async () => {
            throw 'err'
          },
          {
            onError,
          },
        )
        return { loading, data }
      },
    })

    expect(wrapper.vm.loading).toBe(true)

    await flushPromises()

    expect(wrapper.vm.loading).toBe(false)
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toBeCalledWith('err')
  })

  it('should watch ready state to run', async () => {
    const wrapper: any = mount({
      template: '<div id="button" @click="onclick">{{ data }}</div>',
      setup() {
        const ready = ref(false)
        const { loading, data } = useRequest(
          async () => {
            return 'hello'
          },
          {
            ready,
            initialData: 'default',
          },
        )
        return { loading, data, ready }
      },
      methods: {
        onclick() {
          // @ts-ignore
          this.ready = true
        },
      },
    })
    await flushPromises()

    expect(wrapper.html()).toContain('default')
    expect(wrapper.vm.loading).toBe(false)

    await wrapper.find('#button').trigger('click')
    await flushPromises()

    expect(wrapper.html()).toContain('hello')
    expect(wrapper.vm.loading).toBe(false)
  })

  it('should be cancellable', async () => {
    const wrapper: any = mount({
      template: '<div>{{ data }}</div>',
      setup() {
        const { loading, data, cancel } = useRequest(
          async () => {
            return 'hello'
          },
          {
            initialData: 'default',
          },
        )
        return { loading, data, cancel }
      },
    })

    expect(wrapper.html()).toContain('default')
    expect(wrapper.vm.loading).toBe(true)

    await wrapper.vm.cancel()
    await flushPromises()

    expect(wrapper.html()).toContain('default')
    expect(wrapper.vm.loading).toBe(false)
  })
})
