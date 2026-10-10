/* Named placeholders only: JSON brackets and objects are never form fields. */
const tokens = text => [...new Set(String(text).match(/\{[A-Z][A-Z0-9_]{1,60}\}|\[[A-Za-z][^\[\]\r\n{}"]{0,180}\]/g) || [])];
function fieldsFor(text, explicit) {
  const fields = explicit || tokens(text).map(token => ({token, label:token.slice(1,-1).replace(/_/g,' ')}));
  return fields.map(field => {
    if (!tokens(field.token).includes(field.token)) throw Error('Prompt fields must be named tokens, not JSON structure');
    if (!field.token || !String(text).includes(field.token)) throw Error('Unknown prompt field: '+field.token);
    if (!['text','json-string',undefined].includes(field.format)) throw Error('Unsupported prompt field format');
    return {...field, label:field.label || field.token, format:field.format || 'text'};
  });
}
module.exports = {tokens, fieldsFor};
