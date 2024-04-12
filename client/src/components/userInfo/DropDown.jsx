
import React, { useEffect, useState } from 'react';

function DropDown(props) {
  const [selectedNativeLanguage, setSelectedNativeLanguage] = useState();
  const handleNativeLanguageSelection = (event) => {
    const language = event.target.value;
    setSelectedNativeLanguage(language);
  };
  useEffect(() => {
    setSelectedNativeLanguage(props.value);
  }, []);
  

  
  if (props.black) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '3%', paddingRight: '12vw' }}>
        <select
        name={props.name}
          // id="nativeLanguage"
          value={selectedNativeLanguage}
          onChange={handleNativeLanguageSelection}
          style={{
            padding: '12px',
            fontSize: '16px',
            borderRadius: '10px',
            outline: 'none',
            border: 'none',
            backgroundColor: '#000',
            color: '#fff',
            width: props.width ? props.width : '30vw',
          }}
        >
          {props.list.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
    );
  }
  return (
    <select
    name={props.name}
      // id="nativeLanguage"
      value={selectedNativeLanguage}
      onChange={handleNativeLanguageSelection}
      style={{
        padding: '12px',
        fontSize: '16px',
        marginTop:'15px',
        borderRadius: '5px',
        outline: 'none',
        border: 'none',
        backgroundColor: 'white',
        color: 'black',
        width: props.width ? props.width : '30vw',
      }}
    >
      {props.list.map((language) => (
        <option key={language} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}

export default DropDown;
