// @flow weak

import React from 'react';
import { RadioGroup, Radio } from 'material-ui/Radio';

export default function SimpleRadioGroup() {
  return (
    <div style={{ width: 100 }}>
      <RadioGroup selectedValue="home">
        <Radio label="Home" value="home" />
        <Radio label="Work" value="work" />
      </RadioGroup>
    </div>
  );
}
