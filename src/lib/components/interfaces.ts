import { ICommonProps } from "@redwallsolutions/common-interfaces-ts";

export interface IModalStyledProps {
  isReady: boolean;
}

export interface IMModalProps extends ICommonProps {
  children?: any;
  height?: number | string;
  isOpened?: boolean;
  className?: string;
  hasBlur?: boolean;
  borderRadius?: string | number;
  onDismiss?: ()=>void
}
