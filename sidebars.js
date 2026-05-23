// Loader only — the authoritative current-docs navigation lives in
// platform/docs/sidebars.js (next to the content). Do NOT edit navigation here.
//
//   - aggregate workspace: platform/ is a sibling, so the authored file is used
//     directly (edit-and-see-live);
//   - deploy / standalone: deployDocumentation copies the authored file here as
//     sidebars.generated.js (gitignored), which this loader falls back to.
const fs = require('fs');
const path = require('path');

const authored = path.resolve(__dirname, '../platform/docs/sidebars.js');
const generated = path.resolve(__dirname, 'sidebars.generated.js');
const sidebar = fs.existsSync(authored) ? authored : generated;

if (!fs.existsSync(sidebar)) {
  throw new Error(
    'No current-docs sidebar found. Edit platform/docs/sidebars.js in the aggregate ' +
    'workspace, or run deployDocumentation to generate docusaurus/sidebars.generated.js.'
  );
}

module.exports = require(sidebar);
