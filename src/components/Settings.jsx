import React from 'react'
import { motion } from 'framer-motion'

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
      <p className="mt-4 text-gray-600">Adjust your application settings here.</p>
    </motion.div>
  )
}

export default Settings