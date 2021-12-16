import { useState, useCallback } from "react";

import ax from "axios";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import FileUploadIcon from "@mui/icons-material/FileUpload";

import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

function Encode() {
  const [encodeText, setEncodeText] = useState(null);
  const [incodeStr, setIncodeStr] = useState(
    "8899aabbccddeeff0011223344556677"
  );
  const [keyFile, setKeyFile] = useState(null);

  const handleChangeIncodeStr = useCallback(
    ({ target }) => setIncodeStr(target.value),
    []
  );

  const onUploadFile = useCallback(({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = (e) => setKeyFile(e.target.result);
  }, []);

  const onEncode = useCallback(async () => {
    const res = await ax.post("/api/encode", { keyFile, incodeStr });
    const result = res.data?.result ?? "";
    setEncodeText(result);
  }, [incodeStr, keyFile]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 400,
        justifyContent: "space-between",
        height: 500,
      }}
    >
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Исходный текст"
        style={{ width: 400, height: 200 }}
        onChange={handleChangeIncodeStr}
        value={incodeStr}
      />

      <Typography>Выберите ранее сгенерированный ключ</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label sx={{ width: 190 }} htmlFor="contained-button-file">
          <Input
            accept="text/plain"
            id="contained-button-file"
            multiple
            type="file"
            onChange={onUploadFile}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<FileUploadIcon />}
          >
            Загрузить ключ
          </Button>
        </label>
        <Button
          sx={{ width: 190 }}
          variant="contained"
          component="span"
          onClick={onEncode}
        >
          Закодировать
        </Button>
      </Box>

      <Typography
        sx={{
          width: 400,
          height: 200,
          backgroundColor: "#fafafa",
          borderRadius: 3,
          border: "1px solid #cdcbcb",
          display: "flex",
          alignItems: !!encodeText ? "start" : "center",
          justifyContent: !!encodeText ? "start" : "center",
          wordBreak: "break-all",
        }}
      >
        {!!encodeText ? encodeText : "Тут пока пусто =("}
      </Typography>
    </Box>
  );
}

export default Encode;
