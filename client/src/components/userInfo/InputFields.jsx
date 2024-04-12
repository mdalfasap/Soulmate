import React from 'react';
import { TextField } from '@mui/material';


function InputFields(props) {


    return (
        <>
            <TextField
                name={props.name}
                value={props.value}
                placeholder={props.label}
                error={props.error}
                helperText={props.error}
              
                InputProps={{
                    className:  'box' ,
                     style: { width: props.width || '100%' ,marginRight:props.margin,marginTop:props.top} 
                }}
                FormHelperTextProps={{
                    style: {
                        color: 'black',
                    },
                }}
            />
        </>
    );
}

export default InputFields;
