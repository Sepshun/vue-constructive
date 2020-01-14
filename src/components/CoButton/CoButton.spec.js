import { shallowMount } from '@vue/test-utils'
import CoButton from './CoButton.vue'

describe('CoButton', () => {
  it('should render Button', () => {
    const wrapper = shallowMount(CoButton)
    expect(wrapper.find('.co-btn').exists()).toBeTruthy()
  })

  it('should render flat Button', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: {
        type: 'flat'
      }
    })
    expect(wrapper.find('.co-btn.-flat').exists()).toBeTruthy()
  })

  it('should render large Button', () => {
    const wrapper = shallowMount(CoButton, {
      propsData: {
        size: 'l'
      }
    })
    expect(wrapper.find('.co-btn.-size-l').exists()).toBeTruthy()
  })
})
