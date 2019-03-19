import React from 'react';
import AceEditor from 'react-ace';
import MainChecklistBlock from '../../checklist/MainChecklistBlock';
import styles from './css/NewChecklistMarkdown.module.css';
import 'brace/mode/markdown';
import 'brace/theme/textmate';
import MarkdownDescr from './MarkdownDescr';

const Markdown = ({ errorArr, ...props }) => {
  const errors = errorArr.map(err => ({ row: err.indexError, type: 'error', text: err.msg }));

  return (
    <div className={styles.markdownSection}>
      <div className={styles.markdownWrapper}>
        <div>{props.index}</div>
        <div className={styles.markdownEditor}>
          <AceEditor
            className={styles.aceEditor}
            mode="markdown"
            theme="textmate"
            name="mdEditor"
            height="100%"
            width="100%"
            annotations={errors}
            debounceChangePeriod={100}
            onChange={props.handleMarkdownChange}
            fontSize={20}
            showPrintMargin
            showGutter
            highlightActiveLine
            value={props.mdValue}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
              showLineNumbers: true,
              tabSize: 1,
            }}
          />
        </div>
        <div className={styles.markdownPreview}>
          <h1 className={styles.checklistTitle}>{props.checkList.title}</h1>
          <MainChecklistBlock checkListData={props.checkList} hideMainProgressbar />
        </div>
      </div>
    </div>
  );
};

export default Markdown;
