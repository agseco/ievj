/**
 * Replaces arbitrary environment variables (those in `process.env`) in the given object as argument. The place holders
 * are expected in the following format: `${env.NAME_OF_THE_ENV_VAR}`.
 *
 * Note: recursion could be used as an improvement
 *
 * @param {Object} object a JavaScript object
 * @param {Boolean} strict strict evaluation or not - if true and any variable could not be replaced, an error will be thrown
 */
function interpolateEnvVars(object, strict = false) {
  const regex = '\\$\\{env\\.(.*?)\\}'; // Escaping the escaped :D
  const globalRegex = new RegExp(regex, 'g');
  const localRegex = new RegExp(regex);

  let asString = JSON.stringify(object);
  const matches = asString.match(globalRegex);

  if (matches) {
    // TODO: process each token once and replace all in string
    for (let token of matches) {
      const envVarName = token.match(localRegex)[1];
      const envVarValue = process.env[envVarName];
      if (envVarValue) {
        asString = asString.replace(token, envVarValue);
      }
    }
  }

  if (strict && asString.match(globalRegex)) {
    throw Error('Some environment variables could not be replaced');
  }

  return JSON.parse(asString);
}

module.exports = { interpolateEnvVars };
