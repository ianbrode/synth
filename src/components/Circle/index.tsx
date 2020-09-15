import React, { useRef, useEffect } from "react";
import { drag, select } from "d3";

interface Props {
  cx: number;
  cy: number;
  scale: any;
  axis: string;
  setVal: (d: string) => void;
  validator?: (d: number) => boolean;
}

export default ({ cx, cy, setVal, scale, axis, validator }: Props) => {
  const circleRef = useRef(null);

  useEffect(() => {
    const _drag = drag();
    const handler = (d: any) => {
      const val = parseFloat(scale.invert(d[axis])).toFixed(2);
      if (validator && !validator(+val)) return;

      setVal(val);
    };
    const handleDrag = _drag.on("drag", handler);
    select(circleRef.current).call(handleDrag as any);

    return () => {
      _drag.on("drag", null);
    };
  }, [scale, axis, setVal, validator]);

  return <circle ref={circleRef} r="5" cx={cx} cy={cy} />;
};

