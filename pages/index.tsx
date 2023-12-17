import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { HomeWeb } from '../components'

export default function Home() {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      setLoading(false)
    }
  }, [router.isReady])

  return (
    <>{loading ? /* agregar backbone */ <div>Loading...</div> : <HomeWeb />}</>
  )
}
