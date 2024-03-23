import React from './react.js';

export default {
  createRoot (container) {
    return {
      render(app) {
        React.render(app, container)
      }
    }
  }
}
