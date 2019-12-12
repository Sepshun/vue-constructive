<!-- TODO ===========================================================
Improve ripple effect (currently stutters when rapidly clicked)
Allow ripple effect to be customized (color, duration, easing)
Improve color and type styling
Improve sizes
Add icon option to button
Icon only button/FAB
Disabled state
-->

<template>
  <button
    class="btn"
    :class="[`-${color}`, `-size-${size}`, `-${type}`]"
    @mousedown="ripple"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: 'Button'
    },
    type: {
      type: String,
      default: 'raised',
      validator: (value) => {
        return value === 'raised' || value === 'flat'
      }
    },
    color: {
      type: String,
      default: 'null'
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => {
        return value === 's' || value === 'm' || value === 'l' || value === 'xl'
      }
    }
  },
  methods: {
    ripple (e) {
      // Create ripple element
      let rippleContainer = document.createElement('div')
      rippleContainer.className = 'ripple-container'
      let rippleEl = document.createElement('div')
      rippleEl.className = 'ripple'

      // Position ripple element and append
      rippleEl.style.left = `${e.offsetX}px`
      rippleEl.style.top = `${e.offsetY}px`
      rippleContainer.append(rippleEl)
      e.target.appendChild(rippleContainer)

      // Start animation
      e.target.classList.add('-isRippling')

      // Remove ripple element
      setTimeout(() => {
        rippleContainer.parentNode.removeChild(rippleContainer)
        e.target.classList.remove('-isRippling')
      }, 480)
    }
  }
}
</script>

<style lang="scss">
// Ripple Animation
@keyframes ripple {
  0% {
    transform: translate(-50%,-50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%,-50%) scale(4);
    opacity: 0;
  }
}

// Button Element
.btn {
  position: relative;
  border: 2px solid transparent;
  border-radius: 16px;
  color: white;
  font-size: 14px;

  // Interaction Styles
  cursor: pointer;
  transition: 0.15s ease;

  // Styles & Colors
  &.-raised {
    @include shadow(1);
    &:hover { @include shadow(3); }
    &:active {
      @include shadow(0);
      border: 2px solid hsla(0,0%,100%,0.5);
    }

    background: $col-midgray;
    &.-blue { background: $col-blue; }
    &.-green { background: $col-green; }
    &.-yellow { background: $col-yellow; }
    &.-orange { background: $col-orange; }
    &.-red { background: $col-red; }
    &.-purple { background: $col-purple; }
    &.-pink { background: $col-pink; }
  }
  &.-flat {
    background: transparent;
    &:hover {
      background: rgba($col-darkgray,0.1);
      &.-blue { background: rgba($col-blue,0.1); }
      &.-green { background: rgba($col-green,0.1); }
      &.-yellow { background: rgba($col-yellow,0.1); }
      &.-orange { background: rgba($col-orange,0.1); }
      &.-red { background: rgba($col-red,0.1); }
      &.-purple { background: rgba($col-purple,0.1); }
      &.-pink { background: rgba($col-pink,0.1); }
    }
    color: $col-darkgray;
    &.-blue { color: $col-blue; }
    &.-green { color: $col-green; }
    &.-yellow { color: $col-yellow; }
    &.-orange { color: $col-orange; }
    &.-red { color: $col-red; }
    &.-purple { color: $col-purple; }
    &.-pink { color: $col-pink; }
  }

  // Sizes
  &.-size-s { padding: 6.5px $space-m; }
  &.-size-m { padding: 6.5px $space-l; }
  &.-size-l { padding: 6.5px $space-xl; }
  &.-size-xl { padding: $space-l $space-xxl; }

  // Ripple Elements
  > .ripple-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;

    > .ripple {
      height: 49px;
      width: 49px;
      background: hsla(0,0%,0%,0.5);
      border-radius: 32px;

      position: absolute;
      transform: translate(-50%,-50%);
    }
  }
  &.-isRippling {
    > .ripple-container > .ripple {
      animation: ripple 0.5s ease;
    }
  }

  // Override Default Styles
  &:focus { outline: none; }
}
</style>
