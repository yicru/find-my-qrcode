'use client'

import { ReactNode } from 'react'
import { Client, Provider, cacheExchange, fetchExchange } from 'urql'

const client = new Client({
  exchanges: [cacheExchange, fetchExchange],
  url: '/api/graphql',
})

type Props = {
  children: ReactNode
}

export function UrqlProvider({ children }: Props) {
  return <Provider value={client}>{children}</Provider>
}
