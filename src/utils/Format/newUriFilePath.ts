import { IFileFormData } from "@/interfaces/Common"
import { StorageFolderKeys } from "@/interfaces/storage"
import * as FileSystem from "expo-file-system"

export const newUriFilePath = async (
    files: IFileFormData[],
    from: StorageFolderKeys,
    to: StorageFolderKeys
): Promise<IFileFormData[]> => {
    const updatedFiles = await Promise.all(
        files.map(async (file) => {
            let newUri = file.uri.replace(from, to)
            try {
                const fileInfo = await FileSystem.getInfoAsync(file.uri)
                if (!fileInfo.exists) {
                    return file
                }
                const destDir = newUri.substring(0, newUri.lastIndexOf("/"))
                await FileSystem.makeDirectoryAsync(destDir, { intermediates: true })

                await FileSystem.moveAsync({
                    from: file.uri,
                    to: newUri,
                })

                return {
                    ...file,
                    uri: newUri,
                }
            } catch (error) {
                return file
            }
        })
    )
    return updatedFiles
}
