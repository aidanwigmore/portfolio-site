import TextField from '@mui/material/TextField';

import { useTheme } from '@mui/material/styles';

interface CustomTextFieldProps {
  name?: string;
  value?: string;
  multiline?: boolean;
  maxRows?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  sx?: object;
}

function CustomTextField({
  name,
  value,
  multiline,
  maxRows,
  onChange,
  sx,
}: CustomTextFieldProps) {
  const theme = useTheme();

  return (
    <>
      <TextField
        name={name}
        id="filled-basic"
        value={value}
        label="Name"
        multiline={multiline}
        variant="filled"
        maxRows={maxRows ? 1 : 4}
        onChange={onChange}
        sx={{
          backgroundColor: theme.palette.primary.main,
          borderRadius: '8px',
          ...sx,
        }}
      />
    </>
  );
}

export default CustomTextField;
