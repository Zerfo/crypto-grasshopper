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

function Decode() {
  const [keyFile, setKeyFile] = useState(null);
  const [inputFile, setInputFile] = useState(null);

  const handleKeyFileInputChange = useCallback(({ target }) => {
    const file = target.files[0];
    if (!file) return;
    setKeyFile(file);
  }, []);

  const onDecode = useCallback(async () => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(keyFile);
    fileReader.onload = ({ target: { result: keyFileBase64 } }) => {
      fileReader.readAsDataURL(inputFile);
      fileReader.onload = async ({ target: { result: inputFileBase64 } }) => {
        const res = await ax.post("/api/decode", {
          inputFile: inputFileBase64,
          keyFile: keyFileBase64,
        });

        const outputFile = res.data?.outputFile ?? "";

        const outputLink = document.createElement("a");

        const outputPrefix = inputFileBase64.split(",")[0];

        outputLink.download = `encoded_${inputFile.name}`;
        outputLink.href = `${outputPrefix},${outputFile}`;
        outputLink.click();
      };
    };
  }, [inputFile, keyFile]);

  const handleFileInputChange = useCallback(({ target }) => {
    const file = target.files[0];
    if (!file) return;
    setInputFile(file);
  }, []);

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
      <Typography>Выберите файл который нужно раскодировать</Typography>
      <label sx={{ width: 190 }} htmlFor="contained-button-file-1">
        <Input
          id="contained-button-file-1"
          type="file"
          onChange={handleFileInputChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<FileUploadIcon />}
        >
          {inputFile ? inputFile.name : "Загрузить файл"}
        </Button>
      </label>
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
            type="file"
            onChange={handleKeyFileInputChange}
          />
          <Button
            variant="contained"
            component="span"
            startIcon={<FileUploadIcon />}
          >
            {keyFile ? keyFile.name : "Загрузить файл"}
          </Button>
        </label>
        <Button
          sx={{ width: 190 }}
          variant="contained"
          component="span"
          onClick={onDecode}
        >
          Декодировать
        </Button>
      </Box>
    </Box>
  );
}

export default Decode;
