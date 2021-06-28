import componentsConfig from './DynamicConfig';

const components = {};

// eslint-disable-next-line no-plusplus
for (let i = 0; i < componentsConfig.length; i++) {
  const componentConfig = componentsConfig[i];
  // Check if component is not already loaded then load it
  if (components[componentConfig.name] === undefined) {
    // eslint-disable-next-line import/no-dynamic-require
    components[componentConfig.name] = require(`${componentConfig.path}`).default;
  }
}

export default components;
