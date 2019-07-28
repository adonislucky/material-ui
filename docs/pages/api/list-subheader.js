import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from './list-subheader.md';

function Page() {
  return <MarkdownDocs markdown={markdown} />;
}

export default Page;
