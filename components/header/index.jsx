import { cloneElement } from "react";

import Link from "next/link";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import GitHubIcon from "@mui/icons-material/GitHub";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import style from "./style.module.scss";

function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    target: window ? window() : undefined,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function Header(props) {
  return (
    <ElevationScroll {...props}>
      <AppBar className={style.header} position="static">
        <Toolbar className={style.header_toolbar}>
          <Link href="/" passHref>
            <Typography variant="h6" component="div" className={style.link}>
              Криптографический алгоритм "Кузнечик"
            </Typography>
          </Link>

          <div className={style.header_toolbar_right}>
            <span className={style.header_toolbar_right_icon}>
              <Link
                className={style.header_toolbar_right_icon}
                href="https://github.com/Zerfo/crypto-grasshopper"
                passHref
              >
                <a target="_blank">
                  <GitHubIcon sx={{ width: 32, height: 32 }} />
                </a>
              </Link>
            </span>

            <span className={style.header_toolbar_right_authorname}>
              <Typography
                component="p"
                className={style.header_toolbar_right_authorname_name}
              >
                202М ФИиИТ
              </Typography>
            </span>
          </div>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}

export default Header;
