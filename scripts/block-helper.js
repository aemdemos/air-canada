// eslint-disable-next-line import/prefer-default-export
export function safeAppend(parent, ...elements) {
  elements
    .filter((element) => element !== null && element !== undefined)
    .forEach((element) => parent.append(element));
}
