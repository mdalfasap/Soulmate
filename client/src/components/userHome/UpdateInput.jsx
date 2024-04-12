import React from 'react';

function UpdateInput(props) {
  const Icon = props.icon; 



  return (
    <div>
      {props.icon ? (
        <div
          className={
            props.sec
              ? 'ms-4 d-flex pt-2'
              : props.large
              ? 'd-flex  '
              : 'd-flex pt-2'
          }
          style={
            props.large
              ? { height: '12vh', backgroundColor: '#1B223F', width: '20vw', borderRadius: '10px' }
              : props.lowpad
              ? { height: '7vh', backgroundColor: '#1B223F', width: '20vw', marginTop: '-4vh', borderRadius: '10px' }
              : props.lowpadlarge
              ? { height: '12vh', backgroundColor: '#1B223F', width: '20vw', marginTop: '-4vh', borderRadius: '10px' }
              : { height: '7vh', backgroundColor: '#1B223F', width: '20vw', borderRadius: '10px' }
          }
        >
          <div className="col-2">
            <Icon />
          </div>
          <div className="col-10" style={{ overflow: 'hidden' }}>
            <input
              type="text"
              name={props.name}
              className="mt-1 text-light"
              style={{
                backgroundColor: '#1B223F',
                border: 'none',
                outline: 'none',
              }}
              placeholder={props.placeholder}
              value={props.value}
              disabled={props.locked}
            />
          </div>
        </div>
      ) : (
        <div
          className={
            props.large
              ? 'd-flex  '
              : 'd-flex pt-2'
          }
          style={
            props.large
              ? { height: '13vh', backgroundColor: '#1B223F', width: '20vw', borderRadius: '10px' }
              : props.lowpad
              ? { height: '7vh', backgroundColor: '#1B223F', width: '20vw', marginTop: '-4vh', borderRadius: '10px' }
              : props.lowpadlarge
              ? { height: '12vh', backgroundColor: '#1B223F', width: '20vw', marginTop: '-4vh', borderRadius: '10px' }
              : { height: '7vh', backgroundColor: '#1B223F', width: '20vw', borderRadius: '10px' }
          }
        >
          <div className="col-12" style={{ overflow: 'hidden' }}>
            <textarea
              type='text'
              className="w-100 ps-1 h-100"
              value={props.value}
              name={props.name}
              style={{ backgroundColor: '#1B223F', border: 'none', outline: 'none', borderRadius: '10px' }}
              placeholder={props.placeholder}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateInput;
