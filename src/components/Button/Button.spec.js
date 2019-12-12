import { shallowMount } from '@vue/test-utils'
import Button from './Button.vue'

describe('Button', () => {
  it('renders button', () => {
    const wrapper = shallowMount(Button)
    expect(wrapper.find('.btn').exists()).toBeTruthy()
  })

  it('renders flat button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'flat'
      }
    })
    expect(wrapper.find('.btn.-flat').exists()).toBeTruthy()
  })

  it('renders large button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        size: 'l'
      }
    })
    expect(wrapper.find('.btn.-size-l').exists()).toBeTruthy()
  })
})
