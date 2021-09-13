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

export default function Home() {
  return (
    <div>
      <YamlEditor
        json={obj}
        onChange={(value) => console.log('on change: ', value)}
        theme={oneDark}
      />
    </div>
  );
}
