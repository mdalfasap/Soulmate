import React, { useState,useEffect } from 'react';
import { PiGenderMaleBold, PiGenderFemaleBold } from 'react-icons/pi';
import { TbGenderBigender } from 'react-icons/tb';

function Gender(props) {
  const boxSize = '120px';
  const iconSize = '48px';

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelection = (e,gender) => {
    setSelectedGender(gender);
   
  };

  useEffect(() => {
setSelectedGender(props.value)
  }, []);

  return (
    <div
      style={{
        justifyContent: 'center',
        display: 'flex',
        backdropFilter: 'blur(20px)',
        padding: '30px',
        marginTop: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 16px',
        }}
      >
        <input
          type="radio"
          id="male"
          name="gender"
          checked={selectedGender === 'male'}
          value='male'
          onChange={(e) => handleGenderSelection(e,"male")}
          style={{ display: 'none' }}
        />
        <label htmlFor="male" style={{ textAlign: 'center' }}>
          <div
            style={{
              height: boxSize,
              width: boxSize,
              backgroundColor: 'white',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '8px',
              cursor: 'pointer',
              border: selectedGender === 'male' ? '5px solid #495792' : 'none',
            }}
          >
            <PiGenderMaleBold size={iconSize} style={{ color: '#495792' }} />
          </div>
          <span style={{ marginTop: '8px', color:'white'  }}>Male</span>
        </label>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 16px',
        }}
      >
        <input
          type="radio"
          id="female"
          name="gender"
          value='female'
          checked={selectedGender === 'female'}
          onChange={(e) => handleGenderSelection(e,"female")}
          style={{ display: 'none' }}
        />
        <label htmlFor="female" style={{ textAlign: 'center' }}>
          <div
            style={{
              height: boxSize,
              width: boxSize,
              backgroundColor: 'white',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '8px',
              cursor: 'pointer',
              border:
                selectedGender === 'female' ? '5px solid #FF58D0' : 'none',
            }}
          >
            <PiGenderFemaleBold size={iconSize} style={{ color: '#FF58D0' }} />
          </div>
          <span style={{ marginTop: '8px', color:'white' }}>Female</span>
        </label>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 16px',
        }}
      >
        <input
          type="radio"
          id="transgender"
          name="gender"
          value='transgender'
          checked={selectedGender === 'transgender'}
          onChange={(e) => handleGenderSelection(e,"transgender")}
          style={{ display: 'none' }}
        />
        <label htmlFor="transgender" style={{ textAlign: 'center' }}>
          <div
            style={{
              height: boxSize,
              width: boxSize,
              backgroundColor: 'white',
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '8px',
              cursor: 'pointer',
              border:
                selectedGender === 'transgender' ? '5px solid #92497E' : 'none',
            }}
          >
            <TbGenderBigender size={iconSize} style={{ color: '#92497E' }} />
          </div>
          <span style={{ marginTop: '8px', color:'white' }}>Transgender</span>
        </label>
      </div>
    </div>
  );
}

export default Gender;
