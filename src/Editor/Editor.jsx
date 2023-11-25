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
// import Document from '@tiptap/extension-document'
// import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
Link.configure({
    autolink: false,
    openOnClick: true,
})
// import { ColourOption, colourOptions } from '../data';
const colourOptions = [
    {value: 'light', label: 'light'},
    {value: 'dark', label: 'dark'},
    { value: 'green', label: 'green' },
    { value: 'blue', label: 'blue' },
    { value: 'red', label: 'red' },
    {value: 'yellow', label: 'yellow'}
]


const MenuBar = () => {
    const { editor } = useCurrentEditor()
    const [Title, setTitle] = useState('');
    const [UnderTitle, setUnderTitle] = useState('');
    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor])

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
            <button className={'editor__menu-btn'} onClick={addImage}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" viewBox="0 0 18 17" fill="none">
                <path d="M0.5 8.48999C0.5 4.34785 3.85786 0.98999 8 0.98999H17.5V8.48999C17.5 12.6321 14.1421 15.99 10 15.99H0.5V8.48999Z" stroke="black"/>
                <circle cx="9" cy="8.48999" r="2.5" fill="white" stroke="black"/>
                <path d="M9 2.48999L9 4.48999" stroke="black"/>
                <path d="M9 12.49L9 14.49" stroke="black"/>
                <path d="M13 8.48999L15 8.49276" stroke="black"/>
                <path d="M3 8.48999L5 8.49276" stroke="black"/>
                <path d="M12 5.90417L13.4142 4.48996" stroke="black"/>
                <path d="M5 4.48999L6.41421 5.9042" stroke="black"/>
                <path d="M12 11.49L13.4142 12.9042" stroke="black"/>
                <path d="M5 12.9042L6.41421 11.49" stroke="black"/>
            </svg></button>
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
    Image.configure(),
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
    const [, setLink] = useState('')



    return (
        <div className={"editor__div"}>

            <EditorProvider className={'inputfortext'} slotBefore={<MenuBar />} extensions={extensions} content={''}></EditorProvider>
            <div className={"editor__bottom-menu"}>
                <button className={'submit'} onClick={() => {
                    let contentToServer = document.querySelector('.tiptap').innerHTML;
                    // let imagesLinks = document.querySelectorAll('.qweqeqweqeqeqw');
                    let Article = {
                        "content": contentToServer,
                        "title": document.getElementById('Title').value,
                        "subtitle": document.getElementById('undertitle').value,
                        'theme': document.querySelector(".css-1dimb5e-singleValue").textContent,
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
//                         closeModalBtn.addEventListener("click", closeModal);
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