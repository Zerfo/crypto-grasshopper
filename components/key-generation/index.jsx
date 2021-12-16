import { useEffect, useState, useCallback } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ax from 'axios';

function KeyGeneration() {
  const [keyFile, setKeyFile] = useState(null);

  const onDownload = useCallback(() => {
    const link = document.createElement("a");
    link.download = `key.txt`;
    link.href = keyFile;
    link.click();
  }, [keyFile]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await ax.get("/api/generate") || {};
      const { key } = data || {};
      setKeyFile(key);
    }

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100px",
        justifyContent: "space-between",
        width: "400px",
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
