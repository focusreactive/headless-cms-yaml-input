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
  value,
  theme,
  onError = () => {},
  onChange = () => {},
}) => {
  // const [error, setError] = React.useState(null);
  const errors = useErrors(onError);
  const [currentText, setCurrentText] = React.useState('');
  const textValue = yaml.dump(value);

  const handleChange = (text) => {
    try {
      // setCurrentText(text);
      const json = yaml.load(text);
      errors.cleanErrors();
      console.log('🍎 Result', json);

      onChange(json);
      onError(false);
      // if (error) {
      //   // editor.getAllMarks().forEach((m) => m.clear());
      //   // setError(null);
      // }
    } catch (err) {
      console.error(err.mark.snippet);
      errors.markError({
        position: err.mark.position,
        message: err.message,
        snippet: err.mark.snippet,
      });
      // setError(err);
      // const errLineNumber = err.mark.line;
      // editor.doc.markText(
      //   { line: errLineNumber, ch: 0 },
      //   { line: errLineNumber },
      //   { className: 'error-line' },
      // );
      // window.editor = editor;
      // window.data = data;
    }
  };

  const handlePrettify = () => {
    setCurrentText('');
  };

  const handleUndo = () => {
    setCurrentText('');
    setError(null);
    onError(false);
  };

  return (
    <YamlInput
      value={currentText || textValue}
      onChange={handleChange}
      error={errors.error}
      options={{ handleTabs: true, theme }}
    />
  );
};

export default YamlEditor;
