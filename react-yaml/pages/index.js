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

const FollowByText = () => {
  const [textValue, setTextValue] = React.useState('');

  const handleChange = ({ json, text }) => {
    setTextValue(text);
  };

  return (
    <>
      <h1>Following mode</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h2>Source object</h2>
          <YamlEditor json={obj} onChange={handleChange} theme={oneDark} />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Current value</h2>
          <textarea style={{ width: '100%', height: 200 }} value={textValue} />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Following editor</h2>
          <YamlEditor text={textValue} theme={oneDark} key={textValue} />
        </div>
      </div>
    </>
  );
};

const FollowByObj = () => {
  const [jsonValue, setJsonValue] = React.useState(null);

  const handleChange = ({ json, text }) => {
    setJsonValue(json);
  };

  return (
    <>
      <h1>Following mode</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          <h2>Source object</h2>
          <YamlEditor json={obj} onChange={handleChange} theme={oneDark} />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Current value</h2>
          <textarea
            style={{ width: '100%', height: 200 }}
            value={JSON.stringify(jsonValue)}
          />
        </div>
        <div style={{ width: '30%' }}>
          <h2>Following editor</h2>
          <YamlEditor
            json={jsonValue}
            theme={oneDark}
            key={JSON.stringify(jsonValue)}
          />
        </div>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <FollowByText />
      <FollowByObj />
    </div>
  );
}
