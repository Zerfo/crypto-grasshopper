import { useCallback, useState } from "react";

import Head from "next/head";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import TabPanel from "../components/tab-panel";

import KeyGeneration from "../components/key-generation";
import Encode from "../components/encode";
import Decode from "../components/decode";

import styles from "../styles/Home.module.css";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [tab, setTab] = useState(1);

  const handleChangeTab = useCallback((e, newValue) => setTab(newValue), []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Криптографический алгоритм кузнечик</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Генерация ключа" {...a11yProps(0)} />
            <Tab label="Кодирование" {...a11yProps(1)} />
            <Tab label="Декодирование" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <KeyGeneration />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Encode />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Decode />
        </TabPanel>
      </Box>
    </div>
  );
}
