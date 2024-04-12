import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

function SelectPlan() {
    const [selectedOption, setSelectedOption] = React.useState('a');

    const handleOptionChange = (option) => {
      setSelectedOption(option);
    };
  
    return (
      <React.Fragment>
        <Dialog
          open={props.open}
          onClose={props.close}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent style={{width:'30vw', display: 'flex', justifyContent: 'center',backgroundColor:'gray',color:'white'}}>
            <div
              onClick={() => handleOptionChange('a')}
              style={{
                backgroundColor: selectedOption === 'a' ? 'red' : 'transparent',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              A
            </div>
            <div
              onClick={() => handleOptionChange('b')}
              style={{
                backgroundColor: selectedOption === 'b' ? 'red' : 'transparent',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              B
            </div>
            <div
              onClick={() => handleOptionChange('c')}
              style={{
                backgroundColor: selectedOption === 'c' ? 'red' : 'transparent',
                padding: '10px',
                cursor: 'pointer',
              }}
            >
              C
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }

export default SelectPlan