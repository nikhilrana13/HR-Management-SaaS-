"use client"
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/redux/Store'

const PersistProvider = ({children}) => {
  return (
    <PersistGate loading={null} persistor={persistor}>
        {children}
    </PersistGate>
  )
}

export default PersistProvider