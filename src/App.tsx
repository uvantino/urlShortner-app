import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [links, setLinks] = useState<string[]>([]);
  const [linkValue, setLinkValue] = useState("");
  const [message, setMessage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef(null);

  const handleAddLinks = () => {
    {
      console.log(linkValue, "linkvaluehere");
    }
    if (editIndex !== null) {
      const updatedLinks = links;
      updatedLinks[editIndex] = linkValue;
      setLinkValue([...updatedLinks])
    } else {
      // setLinkValue(linkValue);
      setLinks([...links, linkValue]);
    }
    setLinkValue("");
    setEditIndex(null)
  };

  const handleEdit = (idx) => {
    inputRef.current.focus();
    setLinkValue(links[idx])
    setEditIndex(idx);

  };

  const handleclear = () => {
    setLinks([])
  }

  // useEffect(() => {
  //   fetch("http://localhost:5000/api")
  //     .then((response) => response.json())
  //     .then((data) => setMessage(data.message));
  // }, []);

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
          {editIndex !==null ? 'updateUrl' :  'Shorten URL'}
        </button>
      </div>
      <div className="shortenlinks-map">
        {links.map((item, index) => {
          return (
            <ul key={index} className="shortenlinks-ul">
              <li>{item}</li>
              <button
                className="shortlink-edit-btn"
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
            </ul>
          );
        })}
        <button className="shortenlinks-clear-btn" onClick={handleclear}>Clear All</button>
      </div>
      <div className="api-response-here">{message}</div>
    </div>
  );
}

export default App;
