import React, {useEffect, useState } from 'react';

function CheckBox(props) {

  const [selectedDescriptions, setSelectedDescriptions] = useState([]);

  const handleDescriptionSelection = (e) => {
    const { value } = e.target;
    const updatedSelection = [...selectedDescriptions];
  
    const index = updatedSelection.indexOf(value);
  
    if (index === -1) {
      updatedSelection.push(value);
    } else {
      updatedSelection.splice(index, 1);
    }
  
    setSelectedDescriptions(updatedSelection);
    console.log(updatedSelection);
  };
  useEffect(() => {
    setSelectedDescriptions(props.value?props.value:'')
      }, []);
  const itemsPerRow = 3;

  return (
    <div style={{
      position: 'relative',
      height: 'calc(100vh - 100px)', 
      maxHeight: '300px',
      overflowY: 'auto',
      scrollbarWidth: '10px',
      overflowX: 'scroll',
      WebkitOverflowScrolling: 'touch',
      marginTop: '20px',
    }}>
      <div style={{
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        backdropFilter: 'blur(20px)',
        padding: '20px',
        paddingBottom: 0,

      }}>
        {[...Array(Math.ceil(props.options.length / itemsPerRow))].map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '8px' }}>
            {props.options.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((description, index) => (
              <div
                key={index}
                style={{
                  margin: '5px 8px',
                  textAlign: 'center',
                  flex: 1
                }}
              >
                <input
                  type="checkbox"
                  id={description}
                  name={props.name}
                  value={description}
                  checked={selectedDescriptions.includes(description)}
                  onChange={(e) => handleDescriptionSelection(e)}
                  style={{ display: 'none' }}
                />
                <label htmlFor={description} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '14px' }}>
                  <div
                    style={!props.exp?{
                      height: '40px',
                      width: '180px',
                      color:selectedDescriptions.includes(description) ? 'white':'black',
                      backgroundColor: selectedDescriptions.includes(description) ? '#3F4043' : '#D9D9D9',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      border: selectedDescriptions.includes(description) ? '3px solid #C62253' : 'none',
                    }:
                    {
                      height: '65px',
                      width: '100px',
                      color:selectedDescriptions.includes(description) ? 'white':'black',
                      backgroundColor: selectedDescriptions.includes(description) ? '#3F4043' : '#D9D9D9',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      border: selectedDescriptions.includes(description) ? '3px solid #C62253' : 'none',
                    }}
                  >

                    <span>{description}</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
        ))}

        <div style={{ flex: 1 }}></div>
      </div>

      <div style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100px',
        zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, .0),rgba(0, 0, 0, .4),rgba(0, 0, 0, .7), rgba(0, 0, 0, 1))'
      }
    }></div>
    </div>
  );
}

export default CheckBox;
