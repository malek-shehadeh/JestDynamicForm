

import { Alert } from 'digitinary-ui';

interface FormAlertProps {
  severity: "success" | "error" | "info" | "warning";
  variant?: "default" | "filled" | "outlined";
  onClose?: boolean | (() => void); 
  action?: JSX.Element;
  icon?: JSX.Element | boolean;
  customStyle?: Record<string, string | number>;
  children: JSX.Element | string;
  id?: string;
  className?: string;
  dataId?: string;
}

export const FormAlert = (props: FormAlertProps) => <Alert {...props} />;