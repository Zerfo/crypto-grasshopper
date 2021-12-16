import { useState, useCallback } from "react";

import ax from "axios";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";

import FileUploadIcon from "@mui/icons-material/FileUpload";

import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

function Decode() {
  const [decodeText, setDecodeText] = useState(null);
  const [incodeStr, setIncodeStr] = useState("");
  const [keyFile, setKeyFile] = useState(null);
  const [keyFileName, setKeyFileName] = useState(null);

  const onUploadFile = useCallback(({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    setKeyFileName(target?.files?.[0]?.name);
    fileReader.onload = (e) => setKeyFile(e.target.result);
  }, []);

  const onDecode = useCallback(async () => {
    const res = await ax.post("/api/decode", { keyFile, incodeStr });
    const result = res.data?.result ?? "";
    setDecodeText(result);
  }, [incodeStr, keyFile]);

  const handleChangeIncodeStr = useCallback(
    ({ target }) => setIncodeStr(target.value),
    []
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: 500,
        justifyContent: "space-between",
        width: 400,
      }}
    >
      <TextareaAutosize
        aria-label="empty textarea"
        onChange={handleChangeIncodeStr}
        placeholder="Исходный текст"
        style={{ width: 400, height: 200 }}
        value={incodeStr}
      />

      <Typography>Выберите ранее сгенерированный ключ</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <label
          htmlFor="contained-button-file"
          sx={{ width: 190 }}
        >
          <Input
            accept="text/plain"
            id="contained-button-file"
            multiple
            onChange={onUploadFile}
            type="file"
          />
          <Button
            component="span"
            startIcon={!keyFileName && <FileUploadIcon />}
            sx={{ width: 190 }}
            variant="contained"
          >
            {keyFileName || "Загрузить ключ"}
          </Button>
        </label>
        <Button
          component="span"
          disabled={!keyFile}
          onClick={onDecode}
          sx={{ width: 190 }}
          variant="contained"
        >
          Декодировать
        </Button>
      </Box>

      <Typography
        sx={{
          alignItems: !!decodeText ? "start" : "center",
          backgroundColor: "#fafafa",
          border: "1px solid #cdcbcb",
          borderRadius: 3,
          display: "flex",
          height: 200,
          justifyContent: !!decodeText ? "start" : "center",
          padding: '10px',
          width: 400,
          wordBreak: "break-all",
        }}
      >
        {!!decodeText ? decodeText : "Тут пока пусто =("}
      </Typography>
    </Box>
  );
}

export default Decode;
