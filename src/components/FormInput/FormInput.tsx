import { Input } from 'digitinary-ui';

interface InputProps {
 label: string;
 type?: "text" | "password";
 value: string | number;
 onChange: (value: string | number) => void;
 placeholder?: string;
 disabled?: boolean;
 errorMsg?: string;
 helperText?: string;
 clearable?: boolean;
 size?: "small" | "medium" | "large";
 startAdornment?: JSX.Element;
 endAdornment?: JSX.Element;
 autoComplete?: string;
 direction?: "ltr" | "rtl";
 className?: string;
 onClear?: () => void;
 onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
 onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
 onWheel?: (event: React.WheelEvent<HTMLInputElement>) => void;
 onSearchDebounce?: (value: string) => void;
 restrictedCharactersRegex?: RegExp;
 onlyArabic?: boolean;
 defaultValue?: string;
 optional?: boolean;
 blurText?: boolean;
 required?: boolean;
}

export const FormInput = (props: InputProps) => <Input {...props} />;

