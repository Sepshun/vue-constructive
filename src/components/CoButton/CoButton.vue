<!-- TODO ===========================================================
Improve color and type styling
Improve sizes
Add icon option to button
Icon only button/FAB
Disabled state
-->

<script>
export default {
  name: 'CoButton',
  props: {
    href: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: 'blue'
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => {
        return value === 's' || value === 'm' || value === 'l' || value === 'xl'
      }
    },
    rippleActive: {
      type: Boolean,
      default: true
    },
    rippleColor: {
      type: String,
      default: 'hsla(0,0%,100%,0.75)'
    },
    rippleDuration: {
      type: Number,
      default: 0.5
    },
    rippleEasing: {
      type: String,
      default: 'ease'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isRouterLink () {
      return this.$router && this.to
    }
  },
  methods: {
    ripple (e) {
      if (this.rippleActive) {
        // RippleContainer - Get/Create
        let rippleContainer = e.target.querySelector('.ripple-container')

        // RippleElement - Create New
        let rippleEl = document.createElement('div')
        rippleEl.className = 'ripple'

        // RippleElement - Apply Styles, Append, and Animate
        rippleEl.style.left = `${e.offsetX}px`
        rippleEl.style.top = `${e.offsetY}px`
        rippleEl.style.background = this.rippleColor
        rippleEl.style.animationDuration = `${this.rippleDuration}s`
        rippleEl.style.animationTimingFunction = this.rippleEasing
        rippleContainer.append(rippleEl)
        rippleEl.classList.add('-isRippling')

        // RippleElement - Remove
        setTimeout(() => { rippleContainer.removeChild(rippleEl) }, 1000 * this.rippleDuration)
      }
    }
  },
  render (h) {
    let tag = this.href ? 'a' : this.isRouterLink ? 'router-link' : 'button'
    return h(tag, {
      staticClass: 'co-btn',
      class: [
        `-${this.color}`,
        `-size-${this.size}`
      ],
      attrs: {
        ...this.attrs,
        href: this.href,
        disabled: this.disabled
      },
      on: {
        ...this.$listeners,
        touchstart: event => { this.ripple(event) },
        mousedown: event => { this.ripple(event) }
      }
    }, [
      this.$slots.default,
      h('div', { class: 'ripple-container' })
    ])
  }
}
</script>

<style lang="scss">
@import "../CoAnimation/variables";

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
.co-btn {
  position: relative;
  border: 2px solid transparent;
  border-radius: 16px;
  font-size: 14px;
  text-decoration: none;

  // Interaction Styles
  cursor: pointer;
  transition: 0.15s $co-transition-default-timing;

  // Styles & Colors
  // Style: Flat - Default
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

  // Style: Raised
  &.-raised {
    @include shadow(1);
    &:hover:not([disabled]) { @include shadow(3); }
    &:active:not([disabled]) {
      @include shadow(0);
      border: 2px solid hsla(0,0%,100%,0.5);
    }

    background: $col-midgray;
    color: white;
    &.-blue { background: $col-blue; }
    &.-green { background: $col-green; }
    &.-yellow { background: $col-yellow; }
    &.-orange { background: $col-orange; }
    &.-red { background: $col-red; }
    &.-purple { background: $col-purple; }
    &.-pink { background: $col-pink; }
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
    pointer-events: none;

    > .ripple {
      height: 49px;
      width: 49px;
      background: hsla(0,0%,0%,0.5);
      border-radius: 32px;

      position: absolute;
      transform: translate(-50%,-50%) scale(0);

      &.-isRippling {
        animation-name: ripple;
      }
    }
  }

  // Override Default Styles
  &:focus { outline: none; }

  // Disabled State
  &[disabled] {
    opacity: 0.5;
    filter: grayscale(1);
  }
}
</style>
