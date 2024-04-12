import React, { useState,useEffect } from 'react';

function RadioButton(props) {

  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusSelection = (e,status) => {
    setSelectedStatus(status);
    props.handleChange(e,status)
  };
  useEffect(() => {
    setSelectedStatus(props.value)
      }, []);
  const itemsPerRow = props.itemsPerRow;

  return (
    <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(10px)',padding: '30px', marginTop: '20px' }}>
      {[...Array(Math.ceil(props.options.length / itemsPerRow))].map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '8px' }}>
          {props.options.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((status, index) => (
           
            <div key={index} style={{margin:props.drink ? (rowIndex === 1 ? '0 0' : '0 10px') : '0 8px', textAlign: 'center',
            flex: 1,}}>
              
              <input
                type="radio"
                id={status}
                name={props.name}
                value={status}
                checked={selectedStatus === status}
                onChange={(e) => handleStatusSelection(e,status)}
                style={{ display: 'none' }}
              />
               {props.iconUrls?
              <label htmlFor={status} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',fontSize:'14px' }}>
                <div
                  style={{
                    height: '100px',
                    width: '130px',
                    backgroundColor: '#D9D9D9',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '8px',
                    color: selectedStatus === status ?'red':'black',
                    cursor: 'pointer',
                    border: selectedStatus === status ? '5px solid #495792' : 'none',
                  }}
                >
                  <img
                src={props.iconUrls[status]}
                alt={'icon'}
                style={{ width: '50px', height: '50px', marginRight: '8px' }}
              />
                </div>
                <span style={{color:'white'}}>{status}</span>
              </label>
            : 
            
            <label htmlFor={status}>
            <div
              style={{
                height: '50px',
                width: '120px',
                backgroundColor: '#D9D9D9',
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '8px',
                color:selectedStatus === status ?'red':'black',
                cursor: 'pointer',
                border: selectedStatus === status ? '5px solid #495792' : 'none',
              }}
            >
            {status}
            </div>
          </label>}
            </div>

          ))}
        </div>
      ))}
    </div>
  );
}

export default RadioButton;
