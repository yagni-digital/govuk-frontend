# Changelog

Note: We're not following semantic versioning yet, we are going to talk about this soon.

## Unreleased

Breaking change:
- Restructure project to enable it to be published as a single package
  ([PR #680](https://github.com/alphagov/govuk-frontend/pull/680))
  This is ground work to enable the project to be published as a single package by:
  - removing components' package.json files
  - moving "all" files are moved into into root
  - renaming "packages" folder to "package"
  - removing Lerna
  - updating release scripts
  - creating a new package.json
  - updating documentation
  - update any tests and build pipelines to support this
  
  The single package will be published under a new name. 
  There are more changes to be done to folder structure to ensure
  entry points are more understandable.

- Remove -c -o -h layer prefixes
  ([PR #644](https://github.com/alphagov/govuk-frontend/pull/644))
  In user research and in feedback from Private Beta partners we
  learned that users didn't really understand what -o, -c and -h prefixes
  stand for or why they're useful.

  They also introduced additional cognitive load when composing classes,
  having to remember which suffix the classname contains.

  As a result of this, we're removing these prefixes from our codebase.

- Simplify grid syntax and introduce grid-row and column mixins.
  ([PR #665](https://github.com/alphagov/govuk-frontend/pull/665))
  Based on user research feedback we have simplified the grid classes
  to a more consise naming structure. We have also introduced two mixins
  to help generate additional or custom grid styles and widths.

Fixes:

- Remove redundant font-family declaration from the button component – this will
  also fix an issue where the button uses New Transport when printed instead of
  falling back to the print stack as expected.
  (PR [#650](https://github.com/alphagov/govuk-frontend/pull/650))

- Reinstate focus outline for radios and checkboxes on IE8
  (PR [#670](https://github.com/alphagov/govuk-frontend/pull/670))

- Fix section break styles when used with GOV.UK Elements
  ([PR #682](https://github.com/alphagov/govuk-frontend/pull/682))

New features:

- We're now using ES6 Modules and [rollup](https://rollupjs.org/guide/en) to distribute our JavaScript. (PR [#652](https://github.com/alphagov/govuk-frontend/pull/652))
- Checkboxes and Radios conditional reveal
(PR [#616](https://github.com/alphagov/govuk-frontend/pull/616))

- Vendor-in SassMQ functionality, write tests and remove external dependency
  (PR [#657](https://github.com/alphagov/govuk-frontend/pull/657))

- Focus Error Summary on window load
    (PR [#671](https://github.com/alphagov/govuk-frontend/pull/671))

- Opt-in Global `<a>` and `<p>` styles
  (PR [#658](https://github.com/alphagov/govuk-frontend/pull/658))

  Global styles are not included by default.

  This is to avoid the risk of these globals conflicting with any pre-existing globals, for example in GOV.UK Elements or GOV.UK Template.

  Hovever, we do include them in the [GOV.UK Prototype Kit](https://github.com/alphagov/govuk-prototype-kit-private-beta) to speed up prototyping.

  To include global styles, you can set `$govuk-global-styles` variable to `true`.

Internal:

- Update publishing docs (PR [#651](https://github.com/alphagov/govuk-frontend/pull/651))
- Wrap `app.css` in conditional comments in review app layout (PR [#653](https://github.com/alphagov/govuk-frontend/pull/653))
- Fix missing code highlight and remove duplicate layout
(PR [#663](https://github.com/alphagov/govuk-frontend/pull/663))
- Exclude test related files from `dist/` and `packages/` copy task
(PR [#662](https://github.com/alphagov/govuk-frontend/pull/662))
- Add test to check if Sass in packages compiles correctly after the `build:packages` task
(PR [#669](https://github.com/alphagov/govuk-frontend/pull/669))
- Disable code syntax highlighting in IE8
(PR [#675](https://github.com/alphagov/govuk-frontend/pull/675))
- Simplify contents of the `dist/` folder
  (PR [#673](https://github.com/alphagov/govuk-frontend/pull/673))

## 0.0.28-alpha (Breaking release)

Fixes incomplete release from `packages/` and `dist/` in 0.0.27-alpha release.
Missing files were:
- globals/tools/_compatibility.scss
- globals/tools/_ie8.scss
- globals/settings/_compatibility.scss
- globals/settings/_ie8.scss

## 0.0.27-alpha (Breaking release)

Breaking changes:

- Removed an (undocumented) modifier `govuk-c-radio__item--inline` which made
  radio buttons inline, in favour of a new block-level modifier
  `govuk-c-radios--inline` which will automatically make all the radio buttons
  within that block inline.
  (PR [#607](https://github.com/alphagov/govuk-frontend/pull/607))
- Prefix `$global-images` variable
  (PR [#615](https://github.com/alphagov/govuk-frontend/pull/615))
- Simplified how we build stylesheets that target old versions of IE:
  - Removed styles that target IE6 and IE7
  - Replaced IE mixins with a simpler version for targeting IE8 specifically
    without having to specify versions
  - Add a new tool mixin to easily exclude styles when targeting IE8
  - Automatically set $mq-responsive based on the value of the $govuk-is-ie8
    variable.

  If you are building an IE8 stylesheet for your application you'll need to
  update it to reference the new variable $govuk-is-ie8 – see the README for
  details.
  (PR [#631](https://github.com/alphagov/govuk-frontend/pull/631))
- Rename captionSize table argument to captionClasses ([PR #643](https://github.com/alphagov/govuk-frontend/pull/643))

Fixes:
- Link styles, as well as links within the  back-link, breadcrumbs, button,
  error summary, footer and skip link components defend against the
  `a:link:focus` selector in GOV.UK Template, which was overriding focussed
  links to always use the dark blue link colour for text.
  (PR [#609](https://github.com/alphagov/govuk-frontend/pull/609))
- Fix table captions to allow heading classes
  (PR [#633](https://github.com/alphagov/govuk-frontend/pull/633))

New features:
- Add `govuk-main-wrapper--l` a variant of the main page wrapper to use when a
  design does not include back links, breadcrumbs or phase banners
  (PR [#602](https://github.com/alphagov/govuk-frontend/pull/602))
- Added a new `.govuk-link--text-colour` modifier to make links use the same
  colour as the text.
  (PR [#609](https://github.com/alphagov/govuk-frontend/pull/609))
- Introduce new mixins for link styles (muted links, text links) and update
  the existing link classes to use them
  (PR [#609](https://github.com/alphagov/govuk-frontend/pull/609))
- Introduce a new 'compatibility' mixin and settings to allow us to selectively
  include styles that 'counter' styles from the existing products
  (e.g. GOV.UK Template)
  (PR [#609](https://github.com/alphagov/govuk-frontend/pull/609))
- The back link, breadcrumbs and skip link have been updated to use the
  text style link mixin
  (PR [#609](https://github.com/alphagov/govuk-frontend/pull/609))
- Add limited width inputs
  (PR [#626](https://github.com/alphagov/govuk-frontend/pull/626))
- Add details polyfill. This is automatically initialised in the main JS. (PR [#610](https://github.com/alphagov/govuk-frontend/pull/610))
- Add button polyfill. This is automatically initialised in the main JS. [#572](https://github.com/alphagov/govuk-frontend/pull/572))

 Note: Our JavaScript work is ongoing. In the next release of GOV.UK Frontend both of our script will be modularised and split into common functions. This will allow you to use the polyfills in your bundler/build pipeline. For this reason, you might want to wait until the next release before adding these polyfill scripts into your project.

Internal:
- Update check script for new components and tweak docs
  (PR [#589](https://github.com/alphagov/govuk-frontend/pull/589))
- Listen for development server on different port for tests
  (PR [#622](https://github.com/alphagov/govuk-frontend/pull/622))

- Fix date-input default example
(PR [#623](https://github.com/alphagov/govuk-frontend/pull/623))
- Ensure we're testing error-messages in date-input
(PR [#625](https://github.com/alphagov/govuk-frontend/pull/625))

- Explain npm link
(PR [#624](https://github.com/alphagov/govuk-frontend/pull/624))

- Make Sass imports less broad
  (PR [#617](https://github.com/alphagov/govuk-frontend/pull/617))

- Update project README with user research findings (PR [#617](https://github.com/alphagov/govuk-frontend/pull/615))

- Update component READMEs to use `import` statement (PR [#615](https://github.com/alphagov/govuk-frontend/pull/615))

- Use promisify util instead of manual method (PR [#639](https://github.com/alphagov/govuk-frontend/pull/639))

## 0.0.26-alpha (Breaking release)

Breaking changes:

- The error summary component now has a default bottom margin
  (PR [#583](https://github.com/alphagov/govuk-frontend/pull/583))
- Nest components correctly
  (PR [#584](https://github.com/alphagov/govuk-frontend/pull/584))

Fixes:

- Make section break line 1px instead of 2px
(PR [#585](https://github.com/alphagov/govuk-frontend/pull/585))

New features:

- Add footer component (PR [#569](https://github.com/alphagov/govuk-frontend/pull/569))

Internal:

- Update pre-release step to check for new components
(PR [#574](https://github.com/alphagov/govuk-frontend/pull/574))
- Ensure render function does not have undefined object
  (PR [#587](https://github.com/alphagov/govuk-frontend/pull/587))
- Fix components relying on global builds
  (PR [#588](https://github.com/alphagov/govuk-frontend/pull/588))

## 0.0.25-alpha (Breaking release)

Breaking changes:

- The colour variable `$govuk-fuschia` has been replaced with a new variable
  with the correct spelling (`$govuk-fuchsia`) – thanks to
  [@charlesrt](https://github.com/charlesrt) for reporting.
  (PR [#571](https://github.com/alphagov/govuk-frontend/pull/571))

New features:

- The input macro now accepts a `type` which allows you to override the default
  type="text" (PR [#568](https://github.com/alphagov/govuk-frontend/pull/568))

Fixes:
- The transparent outline has been removed from the button, as it already has
  a transparent border which is visible when overriding colours in the browser
  (PR [#552](https://github.com/alphagov/govuk-frontend/pull/552))
- Redundant duplication on the start button variant has been removed as it is
  inherited from the main .govuk-c-button class
  (PR [#552](https://github.com/alphagov/govuk-frontend/pull/552))
- A fix to remove a black border from buttons in IE7 has been removed as we are
  not targeting IE7 for GOV.UK Frontend
  (PR [#552](https://github.com/alphagov/govuk-frontend/pull/552))
- The date input component now sets `type="number"` and `pattern="[0-9]*"` to
  match the previous implementation in Elements
  (PR [#568](https://github.com/alphagov/govuk-frontend/pull/568))

Internal:
- The logic to determine button text colour automatically has been removed and
  replaced with a new variable $govuk-button-text-colour
  (PR [#552](https://github.com/alphagov/govuk-frontend/pull/552))
- The button component now uses the focusable mixin
  (PR [#552](https://github.com/alphagov/govuk-frontend/pull/552))
- The button component Sass has been restructured so that e.g. pseudo-selectors
  are consistently nested within their parents
  (PR [#552](https://github.com/alphagov/govuk-frontend/pull/552))
- Fixes for the release process
(PR [#567](https://github.com/alphagov/govuk-frontend/pull/567))
- Add HTML5-shiv to review app
(PR [#575](https://github.com/alphagov/govuk-frontend/pull/575))

## 0.0.24-alpha (Breaking release)

Breaking changes:

- Namespace existing mixins and functions ( PR [#557](https://github.com/alphagov/govuk-frontend/pull/557))
- The class `.govuk-section-break__visible` has been renamed to
  `.govuk-section-break--visible` as it is a modifier, not an element.
  (PR [#547](https://github.com/alphagov/govuk-frontend/pull/547))
- Simplify `src/` folder structure, remove tree and string manipulations from
gulp tasks (PR [#545](https://github.com/alphagov/govuk-frontend/pull/545))

New features:

- A new variable `$govuk-input-border-colour` has been introduced to define the
  border colour for inputs. The Input, Select and Textarea components have been
  updated to use it.
  (PR [#551](https://github.com/alphagov/govuk-frontend/pull/551))

Fixes:
- Removes media query display on body from compiled CSS
  (PR [#560](https://github.com/alphagov/govuk-frontend/pull/560))

- Fieldset legends now correctly use 'full black' text colour when printed
  (PR [#544](https://github.com/alphagov/govuk-frontend/pull/544))
- Radio and Checkbox components now explicitly use currentColor for their
  borders, rather than relying on inheriting it
  (PR [#551](https://github.com/alphagov/govuk-frontend/pull/551))

Internal:

- The 'prose scope' has been updated to extend only placeholder classes. The
  corresponding classes the prose scope extends have been updated to provide a
  placeholder class and separately create the concrete class. This allows us
  to be specific about which occurrences of the class are meant to be extended.
  (PR [#550](https://github.com/alphagov/govuk-frontend/pull/550))
- The sass-lint config has been updated to prevent the use of `@extend` with
  concrete classes.
  (PR [#550](https://github.com/alphagov/govuk-frontend/pull/550))
- Release process has been streamlined with fewer steps
  (PR [#553](https://github.com/alphagov/govuk-frontend/pull/553))
- Update `govuk-section-break__visible` new class name `govuk-section-break--visible` in the     review app's Typography page.
  (PR [#566](https://github.com/alphagov/govuk-frontend/pull/566))

## 0.0.23-alpha (Breaking release)

Breaking changes:

- Remove Cookie-banner and Previous-next components
  (PR [#488](https://github.com/alphagov/govuk-frontend/pull/488), PR [#523](https://github.com/alphagov/govuk-frontend/pull/523))
- Remove unused colours from the 'applied' colour palette:
  (PR [#525](https://github.com/alphagov/govuk-frontend/pull/525))
  - `$govuk-panel-colour`
  - `$govuk-canvas-colour`
  - `$govuk-highlight-colour`
  - `$govuk-page-colour`
  - `$govuk-discovery-colour`
  - `$govuk-alpha-colour`
  - `$govuk-beta-colour`
  - `$govuk-live-colour`
  - `$govuk-error-background`
  - `$govuk-proposition-border`
  - `$govuk-proposition-active-nav`
  - `$govuk-footer-background`
  - `$govuk-footer-border-top`
  - `$govuk-footer-link`
  - `$govuk-footer-link-hover`
  - `$govuk-footer-text`
- Rename `$govuk-button-colour-darken-15` to `$govuk-button-shadow-colour` to
  avoid tying it to a particular colour.
  (PR [#525](https://github.com/alphagov/govuk-frontend/pull/525))

New features:

- Button hover colour now has a semantic Sass name: $govuk-button-hover-colour
  (PR [#406](https://github.com/alphagov/govuk-frontend/pull/406))
- A new link variant has been added which removes the visited state, for cases
  where distinguishing between visited and unvisited links is not helpful
  (PR [#446](https://github.com/alphagov/govuk-frontend/pull/446))
- The responsive spacing and typography mixins will now throw an error if you
  try to use them with anything other than a spacing or font map respectively.
  (PR [#447](https://github.com/alphagov/govuk-frontend/pull/447))
- Add thematic break to typography and prose scope. This class is added to an
  `<hr>`, adds margin (xl, l and m). There is also an option to make the `<hr>`
  border visible or invisible. (PR [#483](https://github.com/alphagov/govuk-frontend/pull/483))

Fixes:

- Remove double margin from Date input component
  (PR [#451](https://github.com/alphagov/govuk-frontend/pull/451))
- Add top margin for nested lists (PR [#464](https://github.com/alphagov/govuk-frontend/pull/464))
- Remove regular font weight from link styles (PR [#469](https://github.com/alphagov/govuk-frontend/pull/469))
- Remove redundant 'govuk-c-border' div from the details component
  (PR [#481](https://github.com/alphagov/govuk-frontend/pull/481))
- Add `govuk-c-select--error` modifier class to the select component instead of relying on `govuk-c-input--error` (PR [#506](https://github.com/alphagov/govuk-frontend/pull/506))
- Allow error message and hint text to be passed to a select component without requiring a label parameter (PR [#506](https://github.com/alphagov/govuk-frontend/pull/506))
- Define size of inputs etc in `px` rather than `em`. (PR [#491](https://github.com/alphagov/govuk-frontend/pull/491))
- Remove scope=row attribute from non-th elements (PR [527](https://github.com/alphagov/govuk-frontend/pull/527))
- Form components and fieldset now include `govuk-o-form-group` that sets left
border for errors and a bottom margin. Add example of form errors to preview app
(PR [#591](https://github.com/alphagov/govuk-frontend/pull/591))

Internal:

- Replace Mocha/Chai with Jest, re-enable task tests, add back-link component.
  Special thanks to [@htmlandbacon](https://github.com/htmlandbacon) and [@tyom](https://github.com/tyom) for sharing their approaches.
  (PR [#455](https://github.com/alphagov/govuk-frontend/pull/455))
- Add example of nested lists to typography and prose scope in review app (PR [#464](https://github.com/alphagov/govuk-frontend/pull/464))
- Add tests for tag component (PR [#457](https://github.com/alphagov/govuk-frontend/pull/457))
- Add tests for button component (PR [#461](https://github.com/alphagov/govuk-frontend/pull/461))
- Add tests for breadcrumbs component (PR [#461](https://github.com/alphagov/govuk-frontend/pull/461))
- Add tests for details component (PR [#480](https://github.com/alphagov/govuk-frontend/pull/480))
- Add tests for warning text component (PR [#479](https://github.com/alphagov/govuk-frontend/pull/479))
- Add tests for table component (PR [#472](https://github.com/alphagov/govuk-frontend/pull/472))
- Add tests for error-summary component (PR [#489](https://github.com/alphagov/govuk-frontend/pull/489))
- Add tests for radios component (PR [#476](https://github.com/alphagov/govuk-frontend/pull/476))
- Add tests for input component (PR [#478](https://github.com/alphagov/govuk-frontend/pull/478))
- Add tests for date-input component (PR [#495](https://github.com/alphagov/govuk-frontend/pull/495))
- Add tests for textarea component (PR [#497](https://github.com/alphagov/govuk-frontend/pull/497))
- Add tests for panel component (PR [#500](https://github.com/alphagov/govuk-frontend/pull/500))
- Add tests for skip-link component (PR [#498](https://github.com/alphagov/govuk-frontend/pull/498))
- Add tests for file-upload component (PR [#504](https://github.com/alphagov/govuk-frontend/pull/504))
- Add tests for error-message component (PR [#507](https://github.com/alphagov/govuk-frontend/pull/507))
- Add tests for phase-banner component (PR [#505](https://github.com/alphagov/govuk-frontend/pull/505))
- Add tests for label component component (PR [#508](https://github.com/alphagov/govuk-frontend/pull/508))
- Add tests for fieldset component (PR [#509](https://github.com/alphagov/govuk-frontend/pull/509))
- Add tests for select component (PR [#506](https://github.com/alphagov/govuk-frontend/pull/506))
- Add tests for checkboxes component (PR [#513](https://github.com/alphagov/govuk-frontend/pull/513))
- Add tests to make sure the examples pages render without errors [#523](https://github.com/alphagov/govuk-frontend/pull/523)
- Add correct links to the guidance in the Design System in component READMEs
  (PR [#528](https://github.com/alphagov/govuk-frontend/pull/528))

## 0.0.22-alpha (Breaking release)

Breaking changes:

- The link styles in the core layer no longer style `a` elements directly, but
  instead provide a `govuk-link` class which you will need to apply to links
  individually. (PR [#427](https://github.com/alphagov/govuk-frontend/pull/427))
- The link component has been removed from Frontend as the link styles have
  been moved to the core
  (PR [#431](https://github.com/alphagov/govuk-frontend/pull/431))
- Rename `legal-text` argument accepted by `legal-text` component to `text` (PR [#431](https://github.com/alphagov/govuk-frontend/pull/432))
- Rename `legal-text` component to `warning-text` (PR [#431](https://github.com/alphagov/govuk-frontend/pull/432))

New features:

- The prose scope has been extended to style links, which means links within the
  scope do not need the `govuk-link` class applied.
  (PR [#427](https://github.com/alphagov/govuk-frontend/pull/427))
- The muted link variant from the link component is now available as a core
  class (`govuk-link--muted`).
  (PR [#427](https://github.com/alphagov/govuk-frontend/pull/427))

Fixes:

- The error summary component allows users to pass HTML for an entry in the list
  again. (PR [#428](https://github.com/alphagov/govuk-frontend/pull/428))
- Error list entries in the error summary component no longer get wrapped in
  links when no `href` is provided.
  (PR [#428](https://github.com/alphagov/govuk-frontend/pull/428))
- Remove redundant 'resets' for link print styles
  (PR [#427](https://github.com/alphagov/govuk-frontend/pull/427))
- The back link, breadcrumbs, error summary, previous / next and skip link
  components have been updated to include explicit link styling, as they
  previously relied on the global link styles.
  (PR [#427](https://github.com/alphagov/govuk-frontend/pull/427))
- Adjust `warning-text` icon by 1px for New Transport

Internal:

- Add prose scope example (PR [#429](https://github.com/alphagov/govuk-frontend/pull/429))
- Links within the review app and the examples have been updated to use the
  `govuk-link` class.
  (PR [#427](https://github.com/alphagov/govuk-frontend/pull/427))
- Improve documentation around publishing (PR [#430](https://github.com/alphagov/govuk-frontend/pull/430))
- Improve documentation around contributing (PR [#433](https://github.com/alphagov/govuk-frontend/pull/433))
- Remove readme content from review app (PR [#482](https://github.com/alphagov/govuk-frontend/pull/482))

## 0.0.21-alpha (Breaking release)
Skipped 0.0.20-alpha due to difficulties with publishing.

Breaking changes:

- Rename ‘govuk-body-lede’ to ‘govuk-body-lead’. (PR [#405](https://github.com/alphagov/govuk-frontend/pull/405))
- Pluralise radio component (PR [#388](https://github.com/alphagov/govuk-frontend/pull/388))
- Pluralise checkbox component (PR [#384](https://github.com/alphagov/govuk-frontend/pull/384))

New features:

- Add `width` classes, which were based on `form-control` classes that were
specific to form control in Elements. (PR [#413](https://github.com/alphagov/govuk-frontend/pull/413))

Fixes:

- Make buttons 40px high including box shadow (PR [#416](https://github.com/alphagov/govuk-frontend/pull/416))
- Fix focus outline style in Chrome and Safari (PR [#414](https://github.com/alphagov/govuk-frontend/pull/414))
- Remove contributors list from template, fix template markup and update README files (PR [#403](https://github.com/alphagov/govuk-frontend/pull/403))
- Generate breadcrumb chevrons using pseudo-elements (PR [#407](https://github.com/alphagov/govuk-frontend/pull/407))
- Fix undefined classes in date input macro (PR [#410](https://github.com/alphagov/govuk-frontend/pull/410))
- Add documentation for typography helpers / core, simplify syntax (PR [#400](https://github.com/alphagov/govuk-frontend/pull/400))
- Add adjacent styles for headings after lists (PR [#408](https://github.com/alphagov/govuk-frontend/pull/408))
- Allow line height to be overridden in typography helpers (PR [#404](https://github.com/alphagov/govuk-frontend/pull/404))
