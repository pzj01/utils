import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  name: '@pzj01/utils',
  entries: ['src/index'],
  declaration: true,
  clean: true,
  failOnWarn: false,
})
