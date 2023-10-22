import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import React, {useCallback, useState} from 'react';
import "./editor.css";
import {serverAddArticle} from '../sendArticle.js'
import {Modal} from "../modal/modal";
import Select from 'react-select'
// import QRCode, {QRCodeCanvas, QRCodeSVG} from 'qrcode.react';
import QRCode from "react-qr-code";
import chroma from 'chroma-js';
Link.configure({
    autolink: false,
    openOnClick: true,
})
// import { ColourOption, colourOptions } from '../data';
const colourOptions = [
    { value: 'green', label: 'green' },
    { value: 'blue', label: 'blue' },
    { value: 'red', label: 'red' },

]


const MenuBar = () => {
    const { editor } = useCurrentEditor()

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
    }, [editor])
    const [Title, setTitle] = useState('');
    const [UnderTitle, setUnderTitle] = useState('');
    if (!editor) {
        return null
    }

    return (
        <div>
        <div className={'editor__menu'}>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'is-active font-montserrat editor__menu-bold editor__menu-btn' : 'font-montserrat editor__menu-bold editor__menu-btn'}
            >
                <span>bold</span>
                <span>B</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'is-active editor__menu-italic editor__menu-btn' : 'editor__menu-italic editor__menu-btn'}
            >
                <span>italic</span>
                <span>i</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'is-active editor__menu-strike editor__menu-btn' : 'editor__menu-strike editor__menu-btn'}
            >
                <span>strike</span>
                <span>s</span>
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active editor__menu-paragraph editor__menu-btn' : 'editor__menu-paragraph editor__menu-btn'}
            >
                <span>paragraph</span>
                <span>p</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active editor__menu-h1 editor__menu-btn': 'editor__menu-h1 editor__menu-btn'}
            >
                h1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active editor__menu-h2 editor__menu-btn' : 'editor__menu-h2 editor__menu-btn'}
                // class="editor__menu-h2"
            >
                h2
            </button>
            <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : ''}>
                setLink
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active editor__menu-bulletList editor__menu-btn' : 'editor__menu-bulletList editor__menu-btn'}
            >
                <span>• bullet list</span>
                <span>• ul</span>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active editor__menu-orderedList editor__menu-btn' : 'editor__menu-orderedList editor__menu-btn'}
            >
                <span>1. ordered list</span>
                <span>1. ol</span>
            </button>
        </div>
            <input
                type="text"
                name='Title'
                placeholder='Заголовок статьи*'
                value={Title}
                className={'input__title'}
                id={'Title'}
                onChange={(event) => setTitle(event.target.value)}/>
            <input
                type="text"
                name='UnderTitle'
                placeholder="Подзаголовок"
                value={UnderTitle}
                className={'input__undertitle'}
                id={'undertitle'}
                onChange={(event) => setUnderTitle(event.target.value)}/>
        </div>
    )
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false,
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false,
        },
    }),
]


export const Editor =  () => {

    const [Title, setTitle] = useState('');
    const [UnderTitle, setUnderTitle] = useState('');
    const [link, setLink] = useState('')
    editor.commands.setLink({ href: 'https://example.com' })
    editor.commands.setLink({ href: 'https://example.com', target: '_blank' })

    return (
        <div className={"editor__div"}>

            <EditorProvider className={'inputfortext'} slotBefore={<MenuBar />} extensions={extensions} content={''}></EditorProvider>
            <div className={"editor__bottom-menu"}>
                <button className={'submit'} onClick={() => {
                    let contentToServer = document.querySelector('.tiptap').innerHTML;
                    let imagesLinks = document.querySelectorAll();
                    let Article = {
                        "content": contentToServer,
                        "title": document.getElementById('Title').value,
                        "subtitle": document.getElementById('undertitle').value,
                        'theme': document.querySelector(".css-1dimb5e-singleValue").textContent,
                        'images':imagesLinks
                    }
                    console.log(Article)
                    serverAddArticle(Article).then(() => {
                        const modal = document.querySelector(".modal");
                        const overlay = document.querySelector(".overlay");
                        const openModalBtn = document.querySelector(".btn-open");
                        const closeModalBtn = document.querySelector(".btn-close");

// close modal function
                        const closeModal = function () {
                            modal.classList.add("hidden");
                            overlay.classList.add("hidden");
                        };

// close the modal when the close button and overlay is clicked
                        closeModalBtn.addEventListener("click", closeModal);
                        overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
                        document.addEventListener("keydown", function (e) {
                            if (e.key === "Escape" && !modal.classList.contains("hidden")) {
                                closeModal();
                            }
                        });

// open modal function
                        const openModal = function (k) {
                            setLink('qweqwe')
                            let qrcode = document.getElementById('qrcode')
                            // if (p.ok) {console.log(k)x
                            modal.classList.remove("hidden");
                            overlay.classList.remove("hidden");
                                // console.log("error")x
                            // }
                        };
// open modal event
                    openModal('qwe123');
                    })
                }}>
                    Отправить
                </button>
                <Select className={'selectTheme'}
                    defaultValue={colourOptions[2]}
                    options={colourOptions}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: state.isFocused ? 'grey' : 'black',
                            }),
                        }}
                />
            </div>
            <Modal linkForArticle={""} />
        </div>
    )
}