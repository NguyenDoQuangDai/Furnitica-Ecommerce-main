const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    ...(process.env['NODE_ENV'] === 'production' ? [
      require('cssnano')({
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          mergeLonghand: true,
          mergeRules: true,
          reduceIdents: false,
          zindex: false
        }]
      }),
      purgecss({
        content: [
          './src/**/*.html',
          './src/**/*.ts',
          './src/**/*.js',
          './src/**/*.jsx',
          './src/**/*.tsx'
        ],
        safelist: {
          standard: [
            // Angular Material classes
            /^mat-/,
            /^cdk-/,
            // Essential Bootstrap
            'container',
            'container-fluid',
            'row',
            /^col/,
            'btn',
            'btn-primary',
            'btn-secondary',
            'form-control',
            'form-group',
            'navbar',
            'nav-link',
            'active',
            'show',
            'fade',
            'modal',
            'dropdown',
            // Font Awesome (only essential)
            /^fa-/,
            'fas',
            'far',
            'fab',
            // Angular animations
            /^ng-/,
            // Your custom classes that are dynamically added
            'product-item',
            'cart-item',
            'user-profile'
          ],
          deep: [
            // Classes that might be applied to child elements
            /^slick/,
            /^owl-/
          ],
          greedy: [
            // Partial matches
            /btn$/,
            /form$/
          ]
        },
        defaultExtractor: content => {
          // Enhanced extractor for better class detection
          const matches = content.match(/[\w-/:]+(?<!:)/g) || [];
          return matches;
        },
        // Be more aggressive with removal
        rejected: true,
        variables: true
      })
    ] : [])
  ]
};
