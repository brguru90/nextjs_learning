import { useEffect, useState } from 'react'
import useSWR from 'swr'

export default function swrHook(url) {
  const [swrState, setSWRState] = useState(false)
  let { data, error } = useSWR(swrState ? url : null, async (url) => (await fetch(url)).json())
  return [data, error, () => setSWRState(true)]
}
