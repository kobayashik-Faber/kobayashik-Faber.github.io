export default {
  '**/*': [
    (filenames) =>
      `cspell --show-context --no-must-find-files ${filenames.join(' ')}`,
  ],
  '**/*.{js,jsx,ts,tsx,cjs,mjs,cts,mts,svelte}': [
    (filenames) =>
      `prettier --write --ignore-unknown --no-error-on-unmatched-pattern ${filenames.join(
        ' '
      )}`,
  ],
};
