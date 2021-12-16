import { useEffect, useState, useCallback } from "react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ax from 'axios';

import { dataURLtoFile } from '../../util/dataURLtoFile';

function KeyGeneration() {
  const [keyFile, setKeyFile] = useState(null);

  const onDownload = useCallback(() => {
    const link = document.createElement("a");
    link.download = `key.txt`;
    link.href = keyFile;
    link.click();
  }, [keyFile]);

  useEffect(async () => {
    const { data } = await ax.get("/api/generate") || {};
    const { key } = data || {};
    setKeyFile(key)
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
