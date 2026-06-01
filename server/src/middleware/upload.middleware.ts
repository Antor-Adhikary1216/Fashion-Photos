import multer from 'multer'

import { AppError } from '../utils/errors'

const storage = multer.memoryStorage()

export const upload = multer({
  storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!file.mimetype.startsWith('image/')) {
      callback(new AppError(400, 'Only image uploads are allowed'))
      return
    }

    callback(null, true)
  },
})
