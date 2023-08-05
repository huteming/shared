import { mount } from '@vue/test-utils'
import ExampleHooks from '../shared/ExampleHooks.vue'
import { sleep } from '../shared/utils'

test('ExampleHooks', async () => {
  const wrapper = mount(ExampleHooks, {})

  expect(wrapper.find('.count').text()).toBe('0')

  await sleep(20)
  expect(wrapper.find('.count').text()).toBe('1')

  await wrapper.find('button').trigger('click')
  expect(wrapper.find('.count').text()).toBe('2')
})
