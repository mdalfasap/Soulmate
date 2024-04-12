import React, { useState, useEffect } from 'react';

function EducationSelector(props) {
  const educationOptions = ['Bachelors', 'Masters', 'PHD', 'Post Doc'];
  const [selectedEducation, setSelectedEducation] = useState('');
  const [otherEducation, setOtherEducation] = useState('');

  const handleEducation = (e) => {
    setOtherEducation('');
    setSelectedEducation(e.target.value);
  };

  const handleOtherEducation = (e) => {
    setSelectedEducation('');
    setOtherEducation(e.target.value);
  };

  useEffect(() => {
    if (props.value && educationOptions.includes(props.value)) {
      setSelectedEducation(props.value);
      setOtherEducation('');
    } else {
      setSelectedEducation('');
      setOtherEducation(props.value || '');
    }
  }, [props.value]);

  const itemsPerRow = 2;

  return (
    <div style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(20px)', padding: '15px', marginTop: '20px', width: '300px' }}>
      {[...Array(Math.ceil(educationOptions.length / itemsPerRow))].map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '8px', flexWrap: 'wrap' }}>
          {educationOptions.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow).map((education, index) => (
            <div
              key={index}
              style={{
                margin: '8px',
                textAlign: 'center',
                flex: '1 0 40%',
                maxWidth: '120px',
                minWidth: '80px',
              }}
            >
              <input
                type="radio"
                id={education}
                name="education"
                checked={selectedEducation === education}
                onChange={(e) => handleEducation(e)}
                value={education}
                style={{ display: 'none' }}
              />
              <label htmlFor={education} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px' }}>
                <div
                  style={{
                    height: '50px',
                    width: '100%',
                    backgroundColor: '#D9D9D9',
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: selectedEducation === education ? '5px solid #495792' : 'none',
                  }}
                ><span>{education}</span>
                </div>
              </label>
            </div>
          ))}
        </div>
      ))}

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
        <input
          type="text"
          id="otherEducation"
          name="otherEducation"
          placeholder="other"
          onChange={handleOtherEducation}
          value={selectedEducation ? '' : otherEducation}
          style={{ width: '90%', padding: '8px', borderRadius: '10px', outline: 'none', border: 'none', backgroundColor: '#D9D9D9', color: 'black' }}
        />
      </div>
    </div>
  );
}

export default EducationSelector;
