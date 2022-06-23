import React from 'react';
import { oneDark } from '@codemirror/theme-one-dark';
import YamlEditor from '../src';
import { fullYamlText } from '../examples/full-yaml-text';
import { shortYamlText } from '../examples/short-yaml-text';

const KeepEditingText = () => {
  const [textValue, setTextValue] = React.useState('');
  const [jsonValue, setJsonValue] = React.useState('');

  const handleChange = ({ json, text }) => {
    setTextValue(text);
    setJsonValue(json);
  };

  return (
    <>
      <h1>Keep editing value</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h2>Source object</h2>
          <YamlEditor
            text={shortYamlText}
            onChange={handleChange}
            // theme={oneDark}
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Source text</h2>
          <textarea
            style={{ width: '100%', height: 200 }}
            value={textValue}
            readOnly
          />
          <h2>Source json</h2>
          <textarea
            style={{ width: '100%', height: 200 }}
            value={JSON.stringify(jsonValue)}
            readOnly
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Following editor</h2>
          <YamlEditor json={jsonValue} /* theme={oneDark} */ key={!!jsonValue} />
        </div>
      </div>
    </>
  );
};

const ResetEditedText = () => {
  const [textValue, setTextValue] = React.useState('');
  const [jsonValue, setJsonValue] = React.useState('');

  const handleChange = ({ json, text }) => {
    setTextValue(text);
    setJsonValue(json);
  };

  const merge = React.useCallback(({ json }) => ({ json }), []);

  return (
    <>
      <h1>Swap current text with incoming value</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h2>Source object</h2>
          <YamlEditor
            text={shortYamlText}
            onChange={handleChange}
            theme={oneDark}
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Source value</h2>
          <textarea
            style={{ width: '100%', height: 200 }}
            value={textValue}
            readOnly
          />
          <h2>Source json</h2>
          <textarea
            style={{ width: '100%', height: 200 }}
            value={JSON.stringify(jsonValue)}
            readOnly
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Following editor</h2>
          <YamlEditor json={jsonValue} theme={oneDark} merge={merge} />
        </div>
      </div>
    </>
  );
};

const TestSyntax = () => {
  const [textValue, setTextValue] = React.useState('');
  const [jsonValue, setJsonValue] = React.useState('');

  const handleChange = ({ json, text }) => {
    setTextValue(text);
    setJsonValue(json);
  };

  return (
    <>
      <h1>Regression Test</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
        }}
      >
        <div>
          <h2>Source object</h2>
          <YamlEditor
            text={fullYamlText}
            onChange={handleChange}
            theme={oneDark}
          />
        </div>
        <div>
          <h2>Source json</h2>
          <textarea
            style={{ width: '100%', height: 200 }}
            value={JSON.stringify(jsonValue)}
            readOnly
          />
        </div>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <KeepEditingText />
      <ResetEditedText />
      <TestSyntax />
    </div>
  );
}
