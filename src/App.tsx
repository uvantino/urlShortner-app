import { useState, useRef } from "react";
import "./App.css";
import QRCode from 'react-qr-code';

function App() {
  const [links, setLinks] = useState([]);
  const [linkValue, setLinkValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [qrCode, setQrCode] = useState(false);
  const [qrLink, setQrLink] = useState('');
  const inputRef = useRef(null);

  const handleAddLinks = () => {
    if (linkValue.trim() === '') return;
    if (editIndex !== null) {
      const updatedLinks = [...links];
      updatedLinks[editIndex] = linkValue;
      setLinks(updatedLinks);
    } else {
      setLinks([...links, linkValue]);
    }
    setLinkValue("");
    setEditIndex(null);
  };

  const handleEdit = (idx) => {
    inputRef.current.focus();
    setLinkValue(links[idx]);
    setEditIndex(idx);
  };

  const generateQrcode = (index) => {
    setEditIndex(index);
    setQrCode(true);
    setQrLink(links[index]);
  };

  const handleclear = () => {
    setLinks([]);
    setQrCode(false);
  };

  return (
    <div className="shortlinks-main">
      <div className="shortlinks-addlink-section">
        <input
          className="shortlinks-inputfield"
          ref={inputRef}
          type="text"
          placeholder="Paste your links here"
          value={linkValue}
          onChange={(e) => setLinkValue(e.target.value)}
        />
        <button className="shortlink-btn-add" onClick={handleAddLinks}>
          {editIndex !== null ? 'Update URL' : 'Shorten URL'}
        </button>
      </div>
      <div className="shortenlinks-map">
        {links.map((item, index) => (
          <ul key={index} className="shortenlinks-ul">
            <li>{item}</li>
            <button
              className="shortlink-edit-btn"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
            <button onClick={() => generateQrcode(index)}>Generate QR Code</button>
            {editIndex === index && qrCode && (
              <div className='qrcode'>
                <QRCode value={qrLink} size={100} />
              </div>
            )}
          </ul>
        ))}
        <button className="shortenlinks-clear-btn" onClick={handleclear}>Clear All</button>
      </div>
    </div>
  );
}

export default App;