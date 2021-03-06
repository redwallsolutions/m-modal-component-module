import styled from "styled-components";
import { createThemeWithAppearance } from "@redwallsolutions/theming-component-module";
import { IMModalProps, IModalStyledProps } from "./interfaces";

export const theming = createThemeWithAppearance();

export const Container = styled.div<IMModalProps & IModalStyledProps>`
  height: ${({ isReady }) => (isReady ? "100vh" : 0)};
  width: ${({ isReady }) => (isReady ? "100vw" : 0)};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${({ isOpened }) =>
    isOpened ? "rgba(0, 0, 0, 0.4)" : "transparent"};
  transition: background-color 0.4s ${({ isOpened }) => !isOpened && "0.3s"}
    ease-out;
  overflow: hidden;
`;

export const MModal = styled.div<IMModalProps & IModalStyledProps>`
  position: absolute;
  bottom: 0;
  height: ${({ height }) => height};
  width: 100%;
  border-top-left-radius: ${({ borderRadius }) => borderRadius};
  border-top-right-radius: ${({ borderRadius }) => borderRadius};
  overflow-y: auto;
  transition: transform 0.7s ${({ isOpened }) => isOpened && "0.2s"}
      cubic-bezier(0.36, 0.83, 0.05, 0.98),
    height 0.5s cubic-bezier(0.36, 0.83, 0.05, 0.98);
  background: ${(props) => theming(props).contrast};
  color: ${(props) => theming(props).color};
  padding: 10px;
  padding-top: 25px;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.2);
  transform-origin: top left;
  transform: translateY(${({ isOpened }) => (isOpened ? 0 : "100%")});
  will-change: transform;
`;
