import React from "react";

import classes from "./Input.module.css";

interface Props {
  onChange: (data: string) => void;
  value: string;
  disabled?: boolean;
  label?: string;
  min?: number;
  step?: number;
}

const Input = ({
  onChange,
  value = "0.0",
  disabled = false,
  label,
  min,
  step,
}: Props) => {
  return (
    <>
      {label ? <label className={classes.label}>{label}</label> : null}
      <input
        className={classes.input}
        placeholder="0.00"
        value={value}
        type="number"
        disabled={disabled}
        min={min}
        step={step}
        onChange={(event) => {
          const val = event?.target?.value;
          const regexp = /^-?[0-9]*(\.)?[0-9]{0,2}$/;
          if (!val.match(regexp)) return;
          onChange(val);
        }}
      />
    </>
  );
};

export default Input;