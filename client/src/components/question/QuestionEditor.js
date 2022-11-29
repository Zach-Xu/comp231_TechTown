import React, { useState, useEffect } from 'react'

import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, ContentState, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { padding } from '@mui/system';

export default function QuestionEditor(props) {
    const [editorState, setEditorState] = useState();
    const { content, setContent } = props
    useEffect(() => {
        const html = content;
        if (html === undefined) return;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
                contentBlock.contentBlocks
            );
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
        }
    }, [props]);

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                editorStyle={{
                    marginTop: '20px',
                    minHeight: '200px',
                    border: '1px solid grey',
                    padding: '5px 10px'
                }}
                onEditorStateChange={editorState => setEditorState(editorState)}
                onBlur={() => {
                    setContent(
                        draftToHtml(convertToRaw(editorState.getCurrentContent()))
                    );
                }}
            />
        </div>
    );
}
