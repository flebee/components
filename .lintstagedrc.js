module.exports = {
  '*': [
    (files) => `nx affected:lint --fix --files=${files}`,
    (files) => `nx format:write --files=${files}`,
    'prettier --write --ignore-unknown'
  ]
};
