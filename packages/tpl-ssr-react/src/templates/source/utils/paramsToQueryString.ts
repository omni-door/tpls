import { tpl_engine_init } from '@omni-door/utils';

const tpl = 
`\`const isObject = (param\${ts ? ': any' : ''})\${ts ? ': boolean' : ''} =>
  param === Object(param);


const paramsToStringList = (entries\${ts ? ': [string, any][]' : ''})\${ts ? ': string[]' : ''} =>
  entries.reduce(
    (result\${ts ? ': string[]' : ''}, [key, value]\${ts ? ': [string, any]' : ''})\${ts ? ': string[]' : ''} =>
      result.concat(Array.isArray(value)
        ? paramsToStringList(
          value.map((arrayValue\${ts ? ': any' : ''})\${ts ? ': [string, any]' : ''} => [\\\`\\\${key}[]\\\`, arrayValue])
        )
        : [typeof value === 'string' || typeof value === 'number' ? \\\`\\\${key}=\\\${value}\\\` : '']),
    []
  );

export default function paramsToQueryString(params\${ts ? ': any' : ''})\${ts ? ': string' : ''} {
  const paramsString\${ts ? ': string | number' : ''} = isObject(params)
    ? paramsToStringList(
      Object.keys(params)
        .sort()
        .map((key\${ts ? ': string | number' : ''})\${ts ? ': [string, any]' : ''} => [String(key), params[key]])
    )
      .filter((chunk\${ts ? ': string' : ''})\${ts ? ': boolean' : ''} => chunk.length > 0)
      .join('&')
    : ''
    ;
  return paramsString.length > 0 ? \\\`?\\\${paramsString}\\\` : '';
}
\``;

export const tpl_src_utils_params = {
  tpl
};

export default tpl_engine_init(tpl_src_utils_params, 'tpl');