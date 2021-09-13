import * as React from 'react';
import styled from '@emotion/styled';
import YAMLEditor from '@focus-reactive/react-yaml';

import {
  Wrapper,
  useUiExtension,
  FieldExtensionDeclaration,
  FieldExtensionType,
  FieldExtensionFeature,
} from '@graphcms/uix-react-sdk';

const declaration: FieldExtensionDeclaration = {
  extensionType: 'field',
  fieldType: FieldExtensionType.JSON,
  name: 'YAML Input',
  description: 'YAML syntax for editing JS objects',
  features: [FieldExtensionFeature.FieldRenderer],
};

type YAMLFieldDeclarationType = typeof declaration;

type ContainerProps = {
  isExpanded: boolean;
};

const Container = styled.div<ContainerProps>`
  background-color: white;
  min-height: 30px;
  padding: ${(props) => (props.isExpanded ? '16px' : null)};
  height: ${(props) => (props.isExpanded ? '100vh' : null)};
`;

const ExpandButton = styled.button`
  border: none;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: middle;
  box-sizing: border-box;
  min-width: 0px;
  display: inline-block;
  line-height: 16px;
  font-size: 12px;
  font-weight: 400;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: rgb(240, 242, 247);
  color: rgb(72, 84, 130);
  margin: 4px 0;
`;

// declare global {
//   interface Window {
//     handleChange: any;
//   }
// }

type OnChangeParams = {
  json: {};
  text: string;
};

const YAMLField = () => {
  const { value, onChange, isExpanded, expand } =
    useUiExtension<YAMLFieldDeclarationType>();

  const storedJson = value?.json;
  const storedText = value?.text;

  const handleChange = ({ json, text }: OnChangeParams) => {
    onChange({ json, text });
  };

  return (
    <Container isExpanded={isExpanded}>
      <ExpandButton onClick={() => expand(!isExpanded)}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </ExpandButton>
      <YAMLEditor text={storedText} onChange={handleChange} />
    </Container>
  );
};

const Extension = () => (
  <Wrapper declaration={declaration}>
    <YAMLField />
  </Wrapper>
);

export default Extension;
