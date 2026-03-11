/**
 * PostCSS plugin for Bear CSS directives.
 *
 * Usage in CSS/SCSS:
 *   @BearIncludeAll;          — injects all Bear styles
 *   @BearInclude 'base';     — injects only the base module
 *   @BearInclude 'buttons';  — injects only the button styles
 *   @BearInclude 'alerts';   — injects only the alert styles
 *   @BearInclude 'effects';  — injects only effects/animations
 *   @BearInclude 'marquee';  — injects only marquee styles
 *
 * Configure in postcss.config:
 *   module.exports = {
 *     plugins: [
 *       require('@forgedevstack/bear/postcss'),
 *     ],
 *   };
 */

const fs = require('fs');
const path = require('path');

const MODULES = ['base', 'buttons', 'alerts', 'effects', 'marquee'];

function resolveStyleFile(name) {
  const distPath = path.resolve(__dirname, '..', 'styles', `_${name}.css`);
  if (fs.existsSync(distPath)) return distPath;

  const srcPath = path.resolve(__dirname, '..', '..', 'src', 'styles', `_${name}.css`);
  if (fs.existsSync(srcPath)) return srcPath;

  return null;
}

function resolveAllStyles() {
  const distPath = path.resolve(__dirname, '..', 'styles.css');
  if (fs.existsSync(distPath)) return distPath;

  const srcPath = path.resolve(__dirname, '..', '..', 'src', 'styles', 'main.css');
  if (fs.existsSync(srcPath)) return srcPath;

  return null;
}

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  return {
    postcssPlugin: 'bear-include',

    AtRule(atRule) {
      if (atRule.name === 'BearIncludeAll') {
        const file = resolveAllStyles();
        if (file) {
          const css = fs.readFileSync(file, 'utf8');
          atRule.replaceWith(css);
        } else {
          throw atRule.error('Could not resolve Bear styles.css. Make sure @forgedevstack/bear is installed.');
        }
        return;
      }

      if (atRule.name === 'BearInclude') {
        const raw = (atRule.params || '').replace(/['";\s]/g, '');
        if (!raw) {
          throw atRule.error('@BearInclude requires a module name, e.g. @BearInclude \'base\';');
        }
        if (!MODULES.includes(raw)) {
          throw atRule.error(
            `Unknown Bear module '${raw}'. Available: ${MODULES.join(', ')}`
          );
        }
        const file = resolveStyleFile(raw);
        if (file) {
          const css = fs.readFileSync(file, 'utf8');
          atRule.replaceWith(css);
        } else {
          throw atRule.error(`Could not resolve Bear module '${raw}'.`);
        }
      }
    },
  };
};

module.exports.postcss = true;
