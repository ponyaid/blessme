import React, { useState } from 'react'
import { convertToHTML } from 'draft-convert'
import { EditorState, ContentState, convertFromHTML } from 'draft-js'
import { Editor as DraftEditor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export const Editor = ({ content, toolbar, setConvertedContent = () => { } }) => {
    const html = convertFromHTML(content || '')
    const _contentState = ContentState.createFromBlockArray(html)
    const [editorState, setEditorState] = useState(
        () => EditorState.createWithContent(_contentState))

    const handleEditorChange = (state) => {
        setEditorState(state)
        const currentContentAsHTML = convertToHTML(editorState.getCurrentContent())
        setConvertedContent(currentContentAsHTML)
    }

    return (
        <div className="editor">
            <DraftEditor
                editorState={editorState}
                onEditorStateChange={handleEditorChange}
                wrapperClassName="editor__wrap"
                editorClassName="editor__editor"
                toolbarClassName="editor__toolbar"
                toolbar={toolbar || {
                    options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
                    inline: { options: ['bold', 'italic', 'underline', 'strikethrough'] },
                    blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'] },
                    list: { options: ['unordered', 'ordered'] },
                }}
            />
        </div>
    )
}