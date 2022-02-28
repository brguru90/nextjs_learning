import { useEffect, useState } from 'react'
import useSWR from 'swr'
import axios from 'axios';

export default function SwrHook(url) {
  const [swrState, setSWRState] = useState(false)
  let { data, error } = useSWR(swrState ? url : null, async (url) => (await axios.get(url)).data)
  
  return [data, error, () => setSWRState(true)]
}
