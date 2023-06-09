import { Box, Button, Container, InputBase, Typography } from '@mui/material';
import Moment from 'react-moment';
import React, { useState, useEffect, useRef } from 'react';
import {
    List,
    ListItemButton,
    ListItemText,
  } from '@mui/material';
  
const MessageForm = ({ handleSubmit, text, setText, msgs, user1, name }) => {
    const [shouldScroll, setShouldScroll] = useState(true);
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (shouldScroll) {
            messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [msgs, shouldScroll]);

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target;
        if (scrollHeight - scrollTop === clientHeight) {
            setShouldScroll(true);
        } else {
            setShouldScroll(false);
        }
    };

    return (
        <Container
            sx={{
                py: 3,
                bgcolor: '#f8f9fa', //대화 창 색
            }}
        >
            <Box
                sx={{
                    height: '49vh', //메시지 입력 창 높이
                    overflowY: 'scroll',
                }}
                onScroll={handleScroll}
            >
                {msgs.length
                    ? msgs.map((msg, i) => {
                          return (
                              <Box
                                  sx={{
                                      mt: 1,
                                      px: 1,
                                      textAlign:
                                          msg.from === user1 ? 'right' : 'left',
                                  }}
                              >
                                  <Typography
                                      sx={{
                                          display: 'inline-block',
                                          borderRadius: '10px', //박스 네모난정도
                                          maxWidth: '50%', //가로로 늘어나는 길이
                                          p: 1, //추가여백
                                          bgcolor:
                                              msg.from === user1
                                                  ? '#ffe066' //내 메시지 색
                                                  : 'white', //상대 메시지 색
                                      }}
                                  >{msg.text}
                                  </Typography>
                                  <Typography style={{ fontSize: '12px' }}
                                      variant='body2'
                                      sx={{ opacity: 0.7 }}
                                  >{msg.name}<msg> </msg>
                                      <Moment fromNow>
                                        {msg.createdAt.toDate()}
                                      </Moment>
                                  </Typography>
                              </Box>
                          );
                      })
                    : null}
                <div ref={messageEndRef} />
            </Box>
            <Box component='form' onSubmit={handleSubmit}>
                <Box
                    sx={{
                        border: '1px solid #272727',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <InputBase
                        sx={{ pl: 3 }}
                        type='text'
                        placeholder='메시지를 입력하세요'
                        fullWidth
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value);
                        }}
                    />
                    <Button type='submit'>전송</Button>
                </Box>
            </Box>
        </Container>
    );
};

export default MessageForm;
