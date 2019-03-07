import React from 'react';
import { Accordion } from 'semantic-ui-react';
import ReactMarkdown from 'react-markdown';
import style from './css/SingleChecklistItem.module.css';
import MarkdownHighlighter from './MarkdownHighlighter';

const SingleChecklistDetails = (props) => {
  const { propsData, accordionIndex } = props;
  return (
    <Accordion.Content active={accordionIndex === 0}>
      <div className={style.detailsStyle}>
        <ReactMarkdown
          source={propsData.details}
          renderers={{ code: MarkdownHighlighter }}
        />
      </div>
    </Accordion.Content>
  );
};

export default SingleChecklistDetails;
