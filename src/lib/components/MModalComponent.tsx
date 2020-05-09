import React, {
  FC,
  useContext,
  useState,
  useCallback,
  useEffect,
  HTMLAttributes,
  MouseEvent,
} from "react";
import ReactDOM from "react-dom";
import { ThemeContext } from "styled-components";
import { IMModalProps } from "./interfaces";
import { Container, MModal, Body } from "./Style";

const defaultTheme = {
  mode: "light",
};

const el = document.createElement("div");
el.id = "portal-m-modal-component-module";

const MModalComponent: FC<IMModalProps & HTMLAttributes<HTMLDivElement>> = ({
  children,
  theme,
  appearance = "default",
  height = "90%",
  isOpened,
  className = "",
  borderRadius = "36px",
  hasBlur,
  onDismiss,
  ...rest
}) => {
  const [isOpenedState, setIsOpenedState] = useState(isOpened);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isReady) {
      document.body.appendChild(el);
    } else {
      el.remove();
    }
  }, [isReady]);

  useEffect(() => {
    if (isOpened) {
      setIsReady(true);
    }
    setTimeout(() => {
      setIsOpenedState(isOpened);
    }, 50);
  }, [isOpened]);

  const notReady = useCallback(() => {
    setTimeout(() => {
      setIsReady(false);
      if (onDismiss) {
        onDismiss();
      }
    }, 700);
  }, []);

  const close = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element;
    if (target.id === "m-modal-component-module") {
      setIsOpenedState(false);
      notReady();
    }
  }, []);

  const themeToApply = theme || useContext(ThemeContext) || defaultTheme;

  return ReactDOM.createPortal(
    <Container
      id="m-modal-component-module"
      className={className}
      isOpened={isOpenedState}
      onClick={close}
      isReady={isReady}
      {...rest}
    >
      {hasBlur && <Body isOpened={isReady} />}
      <MModal
        height={height}
        isOpened={isOpenedState}
        isReady={isReady}
        theme={themeToApply}
        appearance={appearance}
        borderRadius={borderRadius}
      >
        {children}
      </MModal>
    </Container>,
    el
  );
};

export default MModalComponent;
