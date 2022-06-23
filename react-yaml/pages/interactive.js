import React from 'react';
import YamlEditor from '../src';
import { fullYamlText } from '../examples/full-yaml-text';
import { shortYamlText } from '../examples/short-yaml-text';

const getInitObj = (num) => ({
  xxx: 'lorem1',
  yyy: num,
  zzz: 'lorem 2',
});

const Interactive = () => {
  const actions = React.useRef(null);
  const [selectedText, setSelectedText] = React.useState('');
  const [currentWord, setCurrentWord] = React.useState('');

  const handleSelect = ({ selected }) => {
    setSelectedText(selected);
  };

  const handleSetCursor = ({ word }) => {
    setCurrentWord(word);
  };

  const initObj = getInitObj(1);

  React.useEffect(() => {
    setTimeout(() => {
      console.log('update');
      actions.current.replaceValue({ json: getInitObj(2) });
    }, 3000);
  }, []);

  return (
    <div>
      <div>{`selected: ${selectedText}, currentWord: ${currentWord}`}</div>
      <YamlEditor
        json={initObj}
        onSelect={handleSelect}
        onSetCursor={handleSetCursor}
        ref={actions}
      />
    </div>
  );
};

export default Interactive;
