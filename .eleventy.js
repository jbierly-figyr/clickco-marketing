const yaml = require('js-yaml');
const { DateTime } = require('luxon');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const eleventyHelmetPlugin = require('eleventy-plugin-helmet');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addPairedShortcode('markdown', (content) => {
    return md.render(content);
  });

  // human readable date
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
      'dd LLL yyyy'
    );
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // helmet
  eleventyConfig.addPlugin(eleventyHelmetPlugin);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension('yaml', (contents) =>
    yaml.load(contents)
  );

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    './src/admin/config.yml': './admin/config.yml',
    './node_modules/alpinejs/dist/cdn.min.js':
      './static/js/alpine.js',
    './node_modules/@alpinejs/intersect/dist/cdn.min.js':
      './static/js/alpine-intersect.js',
    './node_modules/prismjs/themes/prism-tomorrow.css':
      './static/css/prism-tomorrow.css',
  });

  // Copy Redirects to / _site
  eleventyConfig.addPassthroughCopy('./src/_redirects');

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy('./src/static/img');

  // Copy JavaScript Folder to /_site
  eleventyConfig.addPassthroughCopy('./src/static/js');

  // Copy Fonts Folder to /_site
  eleventyConfig.addPassthroughCopy('./src/static/fonts');

  // Copy Fonts Folder to /_site
  eleventyConfig.addPassthroughCopy('./src/static/video');

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy('./src/favicon.ico');

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy(
    './src/44531065594045deb33b5dd7f842235e.txt'
  );

  // Minify HTML
  eleventyConfig.addTransform(
    'htmlmin',
    function (content, outputPath) {
      // Eleventy 1.0+: use this.inputPath and this.outputPath instead
      if (outputPath.endsWith('.html')) {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true,
        });
        return minified;
      }

      return content;
    }
  );

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: 'src',
    },
    htmlTemplateEngine: 'njk',
  };
};