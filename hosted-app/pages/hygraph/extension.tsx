import * as React from "react";
import type { NextPage } from "next";
import YamlInput from "@focus-reactive/hygraph-yaml";

const ExtensionApp: NextPage = () => {
  return (
    <div>
      <YamlInput />
    </div>
  );
};

export default ExtensionApp;
