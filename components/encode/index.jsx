import { useState } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';

import FileUploadIcon from '@mui/icons-material/FileUpload';

import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

function Encode() {
  const [encodeText, setEncodeText] = useState(null);

  return <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      width: 400,
      justifyContent: 'space-between',
      height: 500
    }}
  >
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Исходный текст"
      style={{ width: 400, height: 200 }}
    />

    <Typography>Выберите ранее сгенерированный ключ</Typography>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <label sx={{ width: 190 }} htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span" startIcon={<FileUploadIcon />}>
          Загрузить ключ
        </Button>
      </label>
      <Button sx={{ width: 190 }} variant="contained" component="span">
        Закодировать
      </Button>
    </Box>

    <Typography
      sx={{
        width: 400,
        height: 200,
        backgroundColor: '#fafafa',
        borderRadius: 3,
        border: '1px solid #cdcbcb',
        display: 'flex',
        alignItems: !!encodeText ? 'start' : 'center',
        justifyContent: !!encodeText ? 'start' : 'center'
      }}
    >
      {!!encodeText ? encodeText : 'Тут пока пусто =('}
    </Typography>
  </Box>
}

export default Encode;