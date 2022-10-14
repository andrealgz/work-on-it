import * as Data from "../data"

export function translation( data, value ) {
  return Data[data].reduce((acc, cur) => {
    if (cur.value === value) {
      acc = cur.label
    }
      return acc
    },"")
}