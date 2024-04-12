import React, { useEffect, useState, useRef } from 'react';
import { MessageLeft, MessageRight } from './MessageComponents';
import {  useParams } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import { Circles } from 'react-loader-spinner';
import { getMessages, sendMessage } from '../../../helper/helper';
import { formatTimestamp } from '../../../helper/Time';
// import io from 'socket.io-client'
// const socket=io.connect("http://localhost:8080");
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
    width: '100vw',
    padding: '16px',
  },
  chatContainer: {
    width: '100%',
    overflowY: 'auto',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
    width: '80%',
  },
  textField: {
    marginBottom: '2vh',
    width: 'calc(100% - 100px)',
    backgroundColor: '#fff',
    borderRadius: '4px',
    marginRight: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
    },
  },
  button: {
    marginBottom: '2vh',
    width: '100px',
    height: '40px',
    backgroundColor: '#007bff',
    color: '#fff',
  },
};

function ChatBox(props) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const { userId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const getMsg = await getMessages(userId);
        const allMessages = [...getMsg.messages[0].sentMessages, ...getMsg.messages[0].receivedMessages];
        const sortedMessages = allMessages.sort((a, b) => new Date(a.messageTime) - new Date(b.messageTime));
        setMessages(sortedMessages);
        // Scroll to the bottom of the chat container
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sendMessages = async (e) => {
    e.preventDefault();
  
    // socket.emit("send", { message });
    const time = new Date();
    const { receiverId, senderId } = props;
    await sendMessage({ senderId, receiverId, message: message, time });
    setMessage('');

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div style={styles.container}>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Circles height="50" width="50" color="white" visible={true} />
        </div>
      )}
      <div style={styles.chatContainer} ref={chatContainerRef}>
        {messages.map((msg, index) => (
          msg.senderId === props.senderId ? (
            <MessageRight img={props.sendImg} key={index} message={msg.message} timestamp={formatTimestamp(msg.messageTime)} />
          ) : (
            <MessageLeft img={props.recImg} key={index} message={msg.message} timestamp={formatTimestamp(msg.messageTime)} />
          )
        ))}
      </div>
      <form style={styles.form} onSubmit={sendMessages}>
        <TextField
          id="standard-basic"
          variant="outlined"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          multiline
          inputProps={{ style: { height: 'auto', overflowY: 'scroll' } }}
          style={styles.textField}
        />
        <Button type="submit" variant="contained" style={styles.button}>
          Send
        </Button>
      </form>
    </div>
  );
}

export default ChatBox;
