module.exports = {
  // this will check Typescript files
  '**/*.(ts|tsx)': () => [
    "eslint --fix",
    "prettier --write"
  ],
}