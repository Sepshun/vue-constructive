import { shallowMount } from '@vue/test-utils'
import CoAvatar from './CoAvatar.vue'

describe('CoAvatar', () => {
  it('should render the Avatar', () => {
    const wrapper = shallowMount(CoAvatar)
    expect(wrapper.find('.co-avatar').exists()).toBeTruthy()
  })
})
