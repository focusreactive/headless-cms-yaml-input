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

const YamlEditor = ({
  json,
  text,
  theme,
  onError = () => {},
  onChange = () => {},
}) => {
  const errors = useErrors(onError);
  const textValue = json ? yaml.dump(json) : text;
  const currentText = React.useRef(textValue);
  // const [currentText, setCurrentText] = React.useState(textValue);

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
      value={currentText.current}
      onChange={handleChange}
      error={errors.error}
      getErrorPos={getErrorPos}
      options={{ handleTabs: true, theme }}
    />
  );
};

export default YamlEditor;
