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

  const [inputFile, setInputFile] = useState(null);

  const handleInputFileChange = useCallback(({ target }) => {
    const file = target.files[0];
    if (!file) return;
    setInputFile(file);
  }, []);

  // const onUploadFile = useCallback(({ target }) => {
  //   const fileReader = new FileReader();
  //   fileReader.readAsDataURL(target.files[0]);
  //   fileReader.onload = (e) => setKeyFile(e.target.result);
  // }, []);

  const onEncode = useCallback(async () => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(inputFile);
    fileReader.onload = async ({ target: { result } }) => {
      const res = await ax.post("/api/encode", { inputFile: result });

      const outputFile = res.data?.outputFile ?? "";
      const keyFile = res.data?.keyFile ?? "";

      const kyeLink = document.createElement("a");
      const outputLink = document.createElement("a");

      const keyPrefix = "data:text/plain;base64";

      kyeLink.download = `key.txt`;
      kyeLink.href = `${keyPrefix},${keyFile}`;
      kyeLink.click();

      const outputPrefix = result.split(",")[0];

      outputLink.download = `decoded_${inputFile.name}`;
      outputLink.href = `${outputPrefix},${outputFile}`;
      outputLink.click();
    };
  }, [inputFile]);

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
      <Typography> Выберите файл для кодирования</Typography>

      <label sx={{ width: 190 }} htmlFor="contained-button-file">
        <Input
          id="contained-button-file"
          type="file"
          onChange={handleInputFileChange}
        />
        <Button
          variant="contained"
          component="span"
          startIcon={<FileUploadIcon />}
        >
          {inputFile ? inputFile.name : "Загрузить файл"}
        </Button>
      </label>
      {/* <Typography>Выберите ранее сгенерированный ключ</Typography> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* <label sx={{ width: 190 }} htmlFor="contained-button-file">
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
        </label> */}
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
