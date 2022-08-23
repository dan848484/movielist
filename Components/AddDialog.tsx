import {
  Button,
  Dialog,
  DialogTitle,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { createTheme } from "@mui/system";
import React, { ChangeEvent, useEffect, useState } from "react";

interface Props {
  onClick: (name: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const AddDialog = (props: Props) => {
  const [name, setName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [sending, setSending] = useState(false);

  const onClick = () => {
    if (name == "") {
      setInputError(true);
      setHelperText("入力してください。");
      return;
    }
    props.onClick(name);

    close();
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const close = () => {
    setInputError(false);
    setHelperText("");
    setName("");
    props.onClose();
  };

  return (
    <React.Fragment>
      <Dialog open={props.isOpen} className="rounded-[23px]">
        <div className="w-[310px] box-border p-8">
          <DialogTitle className="[margin: 0 auto;] text-center ">
            <p className="font-bold">新規作成</p>
          </DialogTitle>
          <div className="h-16">
            <TextField
              onChange={onChange}
              placeholder="映画名をここに入力"
              variant="outlined"
              className="w-full"
              error={inputError}
              helperText={helperText}
            ></TextField>
          </div>
          <div className="flex justify-between mt-6">
            <Button className="w-28 h-11 " variant="outlined" onClick={close}>
              キャンセル
            </Button>
            <Button className="w-28 h-11" variant="contained" onClick={onClick}>
              作成
            </Button>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
