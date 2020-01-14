<template>
<div
  class="co-avatar"
  :class="[`-size-${size}`]"
>
  <img
    class="image"
    :src="url"
    alt="Avatar Image"
  >
</div>
</template>

<script>
export default {
  name: 'CoAvatar',
  props: {
    url: {
      type: String,
      default: 'https://i.imgur.com/s0BcOMN.png'
    },
    size: {
      type: String,
      default: 'm',
      validator: (value) => {
        return value === 'xs' || value === 's' || value === 'm' || value === 'l' || value === 'xl'
      }
    }
  }
}
</script>

<style lang="scss">
@import "../CoAnimation/variables";

.co-avatar {
  > .image {
    border-radius: 50%;
  }

  &.-size-xs > .image { width: $space-s; height: $space-s; }
  &.-size-s > .image { width: $space-m; height: $space-m; }
  &.-size-m > .image { width: $space-l; height: $space-l; }
  &.-size-l > .image { width: $space-xl; height: $space-xl; }
  &.-size-xl > .image { width: $space-xxl; height: $space-xxl; }
}
</style>
