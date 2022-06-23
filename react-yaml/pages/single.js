import React from 'react';
import YamlEditor from '../src';
import { fullYamlText } from '../examples/full-yaml-text';
import { shortYamlText } from '../examples/short-yaml-text';

const Single = () => {
  const [selectedText, setSelectedText] = React.useState('');
  const [currentWord, setCurrentWord] = React.useState('');

  const handleSelect = ({ selected }) => {
    setSelectedText(selected);
  };

  const handleSetCursor = ({ word }) => {
    setCurrentWord(word);
  };

  return (
    <div>
      <div>{`selected: ${selectedText}, currentWord: ${currentWord}`}</div>
      <YamlEditor
        text={shortYamlText}
        onSelect={handleSelect}
        onSetCursor={handleSetCursor}
      />
    </div>
  );
};

export default Single;
