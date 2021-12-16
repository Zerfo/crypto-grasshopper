import { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ax from 'axios';

function KeyGeneration() {
  const [keyFile, setKeyFile] = useState(null);

  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `download.txt`;
    link.href = "./download.txt";
    link.click();
  };

  useEffect(async () => {
    const res = await ax.get("/api/generate");
    console.log(res);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        height: "100px",
        justifyContent: "space-between",
      }}
    >
      <Typography>Для генерации и сохранения ключа, загрузите его</Typography>
      <Button onClick={onDownload} variant="contained" color="primary">
        Сохранить ключ
      </Button>
    </Box>
  );
}

export default KeyGeneration;
