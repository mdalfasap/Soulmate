import React from 'react';

const styles = {
  messageRow: {
    display: 'flex',
    marginBottom: '10px',
    width: '100%',
    flexWrap: 'wrap', // Wrap content if it exceeds 50% width
  },
  messageRowRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '10px',
    width: '100%',
    flexWrap: 'wrap', // Wrap content if it exceeds 50% width
  },
  messageBlue: {
    position: 'relative',
    marginLeft: '20px',
    padding: '10px',
    backgroundColor: '#A8DDFD',
    width: 'calc(100% - 20px)', // Adjust width considering left margin
    maxWidth: '50%', // Max width is 50% of container
    wordWrap: 'break-word', // Wrap long words
    overflowWrap: 'break-word', // Wrap long strings
    textAlign: 'left',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.9em',
    fontWeight: '400',
    border: '1px solid #97C6E3',
    borderRadius: '10px',
  },
  messageOrange: {
    position: 'relative',
    marginRight: '20px',
    padding: '10px',
    backgroundColor: '#f8e896',
    width: 'calc(100% - 20px)', // Adjust width considering right margin
    maxWidth: '50%', // Max width is 50% of container
    wordWrap: 'break-word', // Wrap long words
    overflowWrap: 'break-word', // Wrap long strings
    textAlign: 'left',
    fontFamily: 'Open Sans, sans-serif',
    fontSize: '0.9em',
    fontWeight: '400',
    border: '1px solid #dfd087',
    borderRadius: '10px',
  },
  messageContent: {
    padding: 0,
    margin: 0,
  },
  messageTimeStampRight: {
    position: 'absolute',
    fontSize: '0.85em',
    fontWeight: '300',
    marginTop: '10px',
    bottom: '-3px',
    right: '5px',
  },
  displayName: {
    marginLeft: '20px',
  },
};

export const MessageLeft = (props) => {
  const {
    message = 'no message',
    timestamp = '',
  } = props;
  return (
    <div style={styles.messageRow}>
      <img src={props.img} alt="" style={{height:'40px',width:'40px',borderRadius:'100px'}}/>
      <div style={styles.messageBlue}>
        <div>
          <p style={styles.messageContent}>{message}</p>
        </div>
        <div style={styles.messageTimeStampRight}>{timestamp}</div>
      </div>
    </div>
  );
};

export const MessageRight = (props) => {
  const { message = 'no message', timestamp = '' } = props;
  return (
    <div style={styles.messageRowRight}>
      <div style={styles.messageOrange}>
        <div>
          <p style={styles.messageContent}>{message}</p>
        </div>
        <div style={styles.messageTimeStampRight}>{timestamp}</div>
      </div>
      <img src={props.img} alt="" style={{height:'40px',width:'40px',borderRadius:'100px'}}/>

    </div>
  );
};

export default MessageLeft;
