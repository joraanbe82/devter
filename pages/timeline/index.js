import Link from 'next/link'
import AppLayout from '../../components/AppLayout'

export default function Timeline() {
  return (
    <>
      <AppLayout>
        <h1>This is the timeline</h1>
        <Link href='/'>Go home</Link>
      </AppLayout>
      <style jsx>{`
        h1 {
          font-size: 36px;
          color: red;
        }
      `}</style>
    </>
  )
}
