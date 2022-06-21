import React from 'react';
import yaml from 'js-yaml';

import YamlInput from './YamlInput';

const useErrors = (onError) => {
  const [error, setError] = React.useState(null);

  const cleanErrors = () => setError(null);

  const markError = ({ position, message, snippet }) => {
    setError({ position, message, snippet });
    onError(true);
  };

  return {
    cleanErrors,
    errorRanges: error,
    markError,
    hasErrors: !!error,
    error,
  };
};

const defaultMerge = ({ text, currentText }) => {
  if (!currentText) {
    return {
      text,
    };
  }
  return {
    text: currentText,
  };
};

const getMergedValue = ({ merge, json, text, currentText }) => {
  if (!text && !currentText && !json) {
    return '';
  }
  if (!text && !json) {
    return currentText;
  }
  const shouldUpdate = merge({ json, text, currentText });

  if (
    shouldUpdate.text !== undefined &&
    typeof shouldUpdate.text === 'string'
  ) {
    return shouldUpdate.text;
  }
  if (shouldUpdate.json) {
    return yaml.dump(shouldUpdate.json);
  }
  throw new Error(
    'merge function should return object with "text" or "json" fields',
  );
};

const YamlEditor = ({
  json,
  text,
  theme,
  onError = () => {},
  onChange = () => {},
  merge = defaultMerge,
}) => {
  const errors = useErrors(onError);
  const textValue = json ? yaml.dump(json) : text;
  const currentText = React.useRef(textValue);
  const [key, setKey] = React.useState(0);

  const mergedValue = React.useMemo(
    () =>
      getMergedValue({
        merge,
        json,
        text,
        currentText: currentText.current,
      }),
    [json, text, merge],
  );

  React.useEffect(() => {
    if (mergedValue !== currentText.current) {
      setKey(key + 1);
    }
  }, [mergedValue]);

  const handleChange = (newText) => {
    try {
      currentText.current = newText;
      const newJson = yaml.load(newText);
      if (errors.hasErrors) {
        errors.cleanErrors();
        onError(null);
      }

      onChange({ json: newJson, text: newText });
    } catch (err) {
      onError(err);
      if (!err.mark?.snippet) {
        console.error(err);
        return;
      }
      console.error(err.mark.snippet);
      errors.markError({
        position: err.mark.position,
        message: err.message,
        snippet: err.mark.snippet,
      });
    }
  };

  const getErrorPos = (newText) => {
    try {
      yaml.load(newText);
      return {};
    } catch (err) {
      if (!err.mark?.snippet) {
        return {};
      }
      return { position: err.mark.position };
    }
  };

  return (
    <YamlInput
      value={mergedValue}
      onChange={handleChange}
      error={errors.error}
      getErrorPos={getErrorPos}
      options={{ handleTabs: true, theme }}
      key={key}
    />
  );
};

export default YamlEditor;
