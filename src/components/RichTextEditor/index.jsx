import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import {
  ImBold,
  ImItalic,
  ImList2,
  ImListNumbered,
  ImUnderline
} from 'react-icons/im';
import { IoMdLink } from 'react-icons/io';
import './styles.css';
import { useClickOutside } from '../../hooks/useClickOutside';
import { FaCheckSquare, FaWindowClose } from 'react-icons/fa';

const RichTextEditor = ({ className, label, dataRTE, setDataRTE }) => {
  const [sizeText, setSizeText] = useState('3');
  const [textColor, setTextColor] = useState('#000000');
  const contentEditableRef = useRef(null);
  const selectionRef = useRef(null);
  const [inputText, setInputText] = useState('');
  const [inputLink, setInputLink] = useState('');

  // Manejar cambios en los inputs

  useEffect(() => {
    console.log(dataRTE);
  }, [dataRTE]);

  useEffect(() => {
    const updateEditorContent = content => {
      if (contentEditableRef.current) {
        contentEditableRef.current.innerHTML = content;
      }
    };

    updateEditorContent(dataRTE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cursorRef = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0).cloneRange();
    }

    if (selectionRef.current) {
      selection.removeAllRanges();
      selection.addRange(selectionRef.current);
    }
    if (!window.getSelection().toString()) {
      document.execCommand('fontSize', false, event.target.value);
    }
  };
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const fontSize = document.queryCommandValue('fontSize');
        setSizeText(fontSize);
      }
    };

    const handleInput = () => {
      updateHtmlContent();
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    contentEditableRef.current.addEventListener('input', handleInput);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      contentEditableRef.current &&
        // eslint-disable-next-line react-hooks/exhaustive-deps
        contentEditableRef.current.removeEventListener('input', handleInput);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleSizeChange = e => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0).cloneRange();
    }

    document.execCommand('fontSize', false, e.target.value);
    setSizeText(e.target.value);

    if (selectionRef.current) {
      selection.removeAllRanges();
      selection.addRange(selectionRef.current);
    }
    if (!window.getSelection().toString()) {
      document.execCommand('fontSize', false, e.target.value);
    }
    setSizeText(e.target.value);
  };
  const handleBoldClick = e => {
    e.preventDefault();
    cursorRef();
    document.execCommand('bold', false, null);
    updateHtmlContent();
  };
  const handleItalicClick = e => {
    e.preventDefault();
    cursorRef();
    document.execCommand('italic', false, null);
    updateHtmlContent();
  };
  const handleColorChange = e => {
    e.preventDefault();
    cursorRef();
    document.execCommand('foreColor', false, e.target.value);
    setTextColor(e.target.value);
    updateHtmlContent();
  };
  const handleOrderedListClick = e => {
    e.preventDefault();
    cursorRef();
    document.execCommand('insertOrderedList', false, null);
    updateHtmlContent();
  };
  const handleUnorderedListClick = e => {
    e.preventDefault();
    cursorRef();
    document.execCommand('insertUnorderedList', false, null);
    updateHtmlContent();
  };
  const handleUnderlineClick = e => {
    e.preventDefault();
    cursorRef();
    document.execCommand('underline', false, null);
    updateHtmlContent();
  };

  const handleHeaderChange = event => {
    const headerValue = event.target.value;
    if (headerValue === 'none') {
      document.execCommand('formatBlock', false, '<div>');
    } else {
      document.execCommand('formatBlock', false, headerValue);
    }
    updateHtmlContent();
  };

  const updateHtmlContent = () => {
    const content = contentEditableRef.current.innerHTML;
    setDataRTE(content);
  };
  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
    }
  };

  const [isFormOpen, setIsFormOpen] = useState('hidden');
  const [savedRange, setSavedRange] = useState(null);
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSavedRange(selection.getRangeAt(0).cloneRange());
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (savedRange) {
      selection.removeAllRanges();
      selection.addRange(savedRange);
    }
  };

  const toggleForm = e => {
    e.preventDefault();
    if (isFormOpen === 'visible') {
      setIsFormOpen('hidden');
      return;
    }
    setIsFormOpen('visible');
    const selection = window.getSelection();
    saveSelection();
    if (selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0).cloneRange();
      setInputText(selectionRef.current.toString());
    }

    const range = selection.getRangeAt(0);
    const box = content?.current?.getBoundingClientRect();
    const scrollTop = content?.current?.scrollTop;
    const rect = range.getBoundingClientRect();

    const top = rect.bottom - box.top + scrollTop;
    const left = rect.left + (rect.right - rect.left) / 2 - box.left - 200 / 2;

    console.log(box.right);

    modalRef.current.style.top =
      (top > 0
        ? top + 28 < content?.current?.scrollHeight
          ? top
          : content?.current?.scrollHeight - (rect.height + 24 * 2 + 2)
        : 0) + 'px';
    modalRef.current.style.left =
      (left > 0 ? (left + 210 < box.width ? left : box.width - 210 - 6) : 0) +
      'px';
  };
  const handleLink = e => {
    e.preventDefault();
    restoreSelection();
    // const selection = window.getSelection();
    // if (selection.rangeCount > 0) {
    //   selectionRef.current = selection.getRangeAt(0).cloneRange();
    // }
    // cursorRef();
    contentEditableRef.current.focus();
    const selectionToLink = selectionRef.current;
    // const linkUrl = 'https://victormireles.com/';
    if (inputLink !== '') {
      document.execCommand(
        'insertHTML',
        false,
        `<a href="${inputLink}" target="_blank">${
          inputText.length !== 0
            ? inputText
            : selectionToLink.toString().length !== 0
            ? selectionToLink.toString()
            : inputLink
        }</a>`
      );
    }
    setInputText('');
    setInputLink('');
    updateHtmlContent();
    setIsFormOpen('hidden');
  };

  const content = useRef(null);
  const modalRef = useClickOutside(() => setIsFormOpen('hidden'));

  // content?.current?.addEventListener('mouseup', function (e) {
  //   const selection = window.getSelection();
  //   saveSelection();
  //   if (selection.rangeCount > 0) {
  //     selectionRef.current = selection.getRangeAt(0).cloneRange();
  //     setInputText(selectionRef.current.toString());
  //   }

  //   const range = selection.getRangeAt(0);
  //   const box = content?.current?.getBoundingClientRect();
  //   const scrollTop = content?.current?.scrollTop;
  //   const rect = range.getBoundingClientRect();

  //   const top = rect.bottom - box.top + scrollTop;
  //   const left = rect.left + (rect.right - rect.left) / 2 - box.left - 200 / 2;

  //   console.log(box.right);

  //   modalRef.current.style.top =
  //     (top > 0
  //       ? top + 28 < content?.current?.scrollHeight
  //         ? top
  //         : content?.current?.scrollHeight - (rect.height + 24 * 2 + 2)
  //       : 0) + 'px';
  //   modalRef.current.style.left =
  //     (left > 0 ? (left + 210 < box.width ? left : box.width - 210 - 6) : 0) +
  //     'px';
  // });

  return (
    <div className={className}>
      {label && (
        <label
          // htmlFor={
          //   contentEditableRef.current && contentEditableRef.current.focus()
          // }

          // onClick={
          //   contentEditableRef.current && contentEditableRef.current.focus()
          // }
          className="block mb-2 w-min text-sm font-medium text-nowrap text-secondary-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <div className="flex items-center space-x-0 pl-0  bg-secondary-50">
        <Button onClick={handleBoldClick} icon={<ImBold />} />
        <Button onClick={handleItalicClick} icon={<ImItalic />} />
        <Button onClick={handleUnderlineClick} icon={<ImUnderline />} />
        <Button onClick={handleUnorderedListClick} icon={<ImList2 />} />
        <Button onClick={handleOrderedListClick} icon={<ImListNumbered />} />
        <Button onClick={toggleForm} icon={<IoMdLink />} />
        <select
          value={sizeText}
          onChange={handleSizeChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="1">12</option>
          <option value="2">14</option>
          <option value="3">16</option>
          <option value="4">18</option>
          <option value="5">20</option>
          <option value="6">22</option>
          <option value="7">24</option>
        </select>
        <select
          onChange={handleHeaderChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="none">Normal</option>
          <option value="h2">H2</option>
          <option value="h3">H3</option>
          <option value="h4">H4</option>
          <option value="h5">H5</option>
          <option value="h6">H6</option>
        </select>
        <input
          type="color"
          value={textColor}
          onChange={handleColorChange}
          className="p-1 border border-gray-300 rounded w-10 h-10"
        />
      </div>
      <div
        ref={content}
        style={{
          position: 'relative'
        }}
      >
        <div
          className="RichTextEditor"
          ref={contentEditableRef}
          contentEditable
          style={{
            border: '1px solid #ccc',
            minHeight: '100px',
            padding: '5px',
            background: 'white'
          }}
          onKeyDown={handleKeyDown}
          // dangerouslySetInnerHTML={{ __html: dataRTE }}
        >
          {/* <textarea
          value={dataRTE.length && dataRTE}
          onChange={setDataRTE}
          style={{ width: '100%', height: '100%' }}
        /> */}
        </div>
        <div
          className="modalLink"
          ref={modalRef}
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            top: '0',
            left: '0',
            visibility: isFormOpen,
            padding: '3px',
            border: 'none',
            borderRadius: '5px',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.416)'
          }}
        >
          <div className="col-span-12  grid grid-cols-12   border-t-3 gap-1">
            <input
              type="text"
              className="col-span-5"
              placeholder="Textoo"
              value={inputText}
              style={{
                border: '2px solid #dadada',
                borderRadius: '10px'
              }}
              onChange={e => setInputText(e.target.value)}
            />
            <input
              type="text"
              className="col-span-5"
              placeholder="Enlace"
              value={inputLink}
              style={{
                border: '2px solid #dadada',
                borderRadius: '10px'
              }}
              onChange={e => setInputLink(e.target.value)}
            />
            <div className="col-span-2">
              <button className="h-full" onClick={handleLink}>
                <FaCheckSquare className="h-full w-full" />
              </button>
              <button className="h-full" onClick={handleLink}>
                <FaWindowClose className="h-full w-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        style={{
          border: '1px solid #ccc',
          minHeight: '100px',
          padding: '5px',
          background: 'white'
        }}
        dangerouslySetInnerHTML={{ __html: dataRTE }}
      ></div> */}
    </div>
  );
};
RichTextEditor.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  dataRTE: PropTypes.string,
  setDataRTE: PropTypes.func
};
export { RichTextEditor };
