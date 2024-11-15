import { cloudinaryUpload } from '../config/cloudinary.config'
import { TImageFile, TImageFiles } from '../interface/image.interface'

export const deleteImagesFromCloudinary = (files: TImageFile | TImageFiles) => {
  const publicIds: string[] = []

  if (Array.isArray(files.fieldname)) {
    for (const file of Object.values(files)) {
      for (const image of file) {
        publicIds.push(image.filename)
      }
    }
  } else {
    publicIds.push(files.filename as string)
  }

  return new Promise((resolve, reject) => {
    cloudinaryUpload.api.delete_resources(
      publicIds,
      { resource_type: 'image' },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      },
    )
  })
}
