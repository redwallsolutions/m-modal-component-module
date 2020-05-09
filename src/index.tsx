import React, { FC, FormEvent, useState, useCallback } from "react";
import { render } from "react-dom";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { createThemeWithAppearance } from "@redwallsolutions/theming-component-module";
import Modal from "./lib";
import {
  IAppearance,
  IThemeMode,
} from "@redwallsolutions/common-interfaces-ts";

const theming = createThemeWithAppearance();

const Reset = createGlobalStyle<any>`
    body {
		font-family: Arial, Helvetica, Geneva, Tahoma, sans-serif;
        padding: 0;
        margin: 0;
        background-color: ${(props) => theming(props).contrast};
        color: ${(props) => theming(props).color};
        &, * {
            box-sizing: border-box;
        }
    }
`;

Reset.defaultProps = {
  appearance: "default",
} as any;

const Container = styled.div`
  height: 100vw;
  padding: 10px;
  margin: 0;
`;

const InputsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const InputItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2em;
`;

const App: FC = () => {
  const [themeMode, setThemeMode] = useState("light");
  const [appearance, setAppearance] = useState("default");
  const [isOpened, setIsOpened] = useState(false);
  const [hasBlur, setHasBlur] = useState(false);
  const [height, setHeight] = useState("40%");

  const randomHeight = useCallback(() => {
    setHeight((Math.random() * 100 + 1).toFixed(0) + "%");
  }, [height]);

  const onChange = (event: FormEvent) => {
    let currentTarget = event.currentTarget;
    let inputName = currentTarget.attributes.getNamedItem("name").nodeValue;
    if (inputName === "mode") {
      setThemeMode(currentTarget.id);
    } else if (inputName === "opened") {
      setIsOpened(!isOpened);
    } else if(inputName === "hasBlur") {
      setHasBlur(!hasBlur);
    }else {
      setAppearance(currentTarget.id);
    }
  };

  return (
    <ThemeProvider theme={{ mode: themeMode }}>
      <Container>
        <Reset appearance={appearance} />
        <InputsContainer>
          <InputItem>
            <label htmlFor="light">Mode Light</label>
            <input type="radio" id="light" onChange={onChange} name="mode" />
          </InputItem>
          <InputItem>
            <label htmlFor="dark">Mode Dark</label>
            <input type="radio" id="dark" onChange={onChange} name="mode" />
          </InputItem>
          <InputItem>
            <label htmlFor="default">Appearance Default</label>
            <input
              type="radio"
              id="default"
              onChange={onChange}
              name="appearance"
            />
          </InputItem>
          <InputItem>
            <label htmlFor="primary">Appearance Primary</label>
            <input
              type="radio"
              id="primary"
              onChange={onChange}
              name="appearance"
            />
          </InputItem>
          <InputItem>
            <label htmlFor="secondary">Appearance Secondary</label>
            <input
              type="radio"
              id="secondary"
              onChange={onChange}
              name="appearance"
            />
          </InputItem>
          <InputItem>
            <label htmlFor="opened">Opened State</label>
            <input
              type="checkbox"
              id="opened"
              onChange={onChange}
              name="opened"
              checked={isOpened}
            />
          </InputItem>
          <InputItem>
            <label htmlFor="hasBlur">hasBlur</label>
            <input
              type="checkbox"
              id="hasBlur"
              onChange={onChange}
              name="hasBlur"
              checked={hasBlur}
            />
          </InputItem>
        </InputsContainer>
        <Modal
          height={height}
          isOpened={isOpened}
          borderRadius="20px"
          hasBlur={hasBlur}
          onDismiss={() => {
            setIsOpened(false);
          }}
        >
          <button onClick={randomHeight}>Random my own height</button>
          {height}
        </Modal>
      </Container>
    </ThemeProvider>
  );
};

render(<App />, document.querySelector("#app"));
