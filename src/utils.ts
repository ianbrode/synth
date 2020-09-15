import jstats from "jstat";
import { Item } from "./types";

export const createData = (
  interval: string,
  upper_bound: string,
  lower_bound: string,
  mean: string,
  std: string,
): Item[] => {
  const _interval = parseFloat(interval || '0');
  const _upper_bound = parseFloat(upper_bound || '0');
  const _lower_bound = parseFloat(lower_bound || '0');
  const _mean = parseFloat(mean || '0');
  const _std = parseFloat(std || '0');

  const n = Math.ceil((_upper_bound - _lower_bound) / _interval);
  const data = [];

  let x_position = _lower_bound;
  for (let i = 0; i < n; i++) {
    data.push({
      y: jstats.normal.pdf(x_position, _mean, _std),
      x: x_position,
    });
    x_position += _interval;
  }
  return data;
};
