// ------------------------------------------------------------
// Generates new component files ------------------------------
// Streamlining setup -----------------------------------------
// ------------------------------------------------------------

// ------------------------------------------------------------
// Require Modules --------------------------------------------
const fs = require('fs-extra')

// ------------------------------------------------------------
// Paths Object -----------------------------------------------
const path = {
  root: '',
  component (name) { return `src/components/${name}` },
  docs (name) { return `docs/app/pages/Components/${name}` }
}

// ------------------------------------------------------------
// String Conversion Methods ----------------------------------
function pascalToDash (str) {
  return str.split(/(?=[A-Z])/).join('-').toLowerCase()
}
// function toCamelCase (str) {
//   return str.charAt(0).toLowerCase() + str.substr(1)
// }

// ------------------------------------------------------------
// Generate File Object ---------------------------------------
const generateFile = {
  save (path, name, contents) {
    if (!fs.existsSync(path)) fs.mkdirSync(path)
    fs.writeFile(`${path}/${name}`, contents, err => { if (err) throw err })
  },
  component (name) {
    generateFile.save(path.component(name), `${name}.vue`, `<template>
<div class="${pascalToDash(name)}">
  <slot />
</div>
</template>

<script>
export default {
  name: '${name}'
}
</script>

<style lang="scss">
@import "../CoAnimation/variables";

.${pascalToDash(name)} {
  transition: .3s $co-transition-default-timing;
}
</style>`.trim() + '\n'
    )
  },
  test (name) {
    generateFile.save(path.component(name), `${name}.spec.js`, `import { shallowMount } from '@vue/test-utils'
import ${name} from './${name}.vue'

describe('${name}', () => {
  it('should render the ${singleName}', () => {
    const wrapper = shallowMount(${name})
    expect(wrapper.find('.${pascalToDash(name)}').exists()).toBeTruthy()
  })
})`.trim() + '\n'
    )
  },
  index (name) {
    generateFile.save(path.component(name), 'index.js', `import ${name} from './${name}.vue'
export default ${name}`.trim() + '\n'
    )
  }
}

// ------------------------------------------------------------
// Get Name from Arguments ------------------------------------
const [componentName] = process.argv.slice(2)
if (!componentName) {
  console.log('Please provide a name for the component. Example:')
  console.log('npm run new-component \'CoComponent\'')
  process.exit()
}
const singleName = componentName.replace('Co', '')
// const camelCasedName = toCamelCase(singleName.replace('Co', ''))

// ------------------------------------------------------------
// Generate Files ---------------------------------------------
generateFile.component(componentName)
generateFile.test(componentName)
generateFile.index(componentName)
