import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Example from '../shared/ExampleSimple.vue'

describe('ExampleSimple', () => {
  it('success', async () => {
    const wrapper = shallowMount(Example)

    wrapper.setData({ username: ' '.repeat(7) })

    expect(wrapper.find('.error').exists()).toBe(true)

    wrapper.setData({ username: 'Lachlan' })
    await flushPromises()

    expect(wrapper.find('.error').exists()).toBe(false)
  })
})
