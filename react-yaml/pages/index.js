import React from 'react';
import { oneDark } from '@codemirror/theme-one-dark';
import YamlEditor from '../src';

const obj = {
  foo: {
    bar: 'a1',
    dar: 'a2',
    zar: 'a3',
  },
  items: [
    {
      x: 1,
      y: 'blabla',
    },
    {
      x: 2,
      z: 'hellow world\n',
    },
    {
      x: 3,
    },
  ],
  newLine: 'blasdf\nblaslsls\n',
};

const KeepEditingText = () => {
  const [textValue, setTextValue] = React.useState('');

  const handleChange = ({ json, text }) => {
    setTextValue(text);
  };

  return (
    <>
      <h1>Keep editing value</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h2>Source object</h2>
          <YamlEditor json={obj} onChange={handleChange} theme={oneDark} />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Source value</h2>
          <textarea style={{ width: '100%', height: 200 }} value={textValue} />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Following editor</h2>
          <YamlEditor json={obj} theme={oneDark} />
        </div>
      </div>
    </>
  );
};

const ResetEditedText = () => {
  const [jsonValue, setJsonValue] = React.useState(null);

  const handleChange = ({ json }) => {
    setJsonValue(json);
  };

  const merge = React.useCallback(({ json }) => ({ json }), []);

  return (
    <>
      <h1>Swap current text with incoming value</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h2>Source object</h2>
          <YamlEditor json={obj} onChange={handleChange} theme={oneDark} />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Source value</h2>
          <textarea
            style={{ width: '100%', height: 200 }}
            value={JSON.stringify(jsonValue)}
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Following editor</h2>
          <YamlEditor json={jsonValue || obj} theme={oneDark} merge={merge} />
        </div>
      </div>
    </>
  );
};

export default function Home() {
  const [value, setValue] = React.useState(obj);

  const handleChange = ({ json, text }) => {
    setValue(json);
  };

  return (
    <div>
      <KeepEditingText />
      <ResetEditedText />
      {/* <YamlEditor json={value} onChange={handleChange} theme={oneDark} /> */}
    </div>
  );
}
