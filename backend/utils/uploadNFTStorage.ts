// Import the NFTStorage class and File constructor from the 'nft.storage' package
import { NFTStorage, File } from "nft.storage"
import mime from "mime"
import fs from "fs"
import path from "path"
import "dotenv/config"

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY!
const imagesDir = "./resources/images/"
const metadataDir = "./resources/metadata/"

interface UploadDirRsp {
    cid: string
    filenames: string[]
}

async function main(): Promise<string> {
    const imagesUploadRsp = await uploadDir(imagesDir)
    for (const idx in imagesUploadRsp.filenames) {
        const filename = imagesUploadRsp.filenames[idx]
        const name = filename.substring(0, filename.length - 4)
        const metadata = {
            name: name,
            description: name,
            image: `ipfs://${imagesUploadRsp.cid}/${filename}`,
        }
        fs.writeFileSync(
            `${metadataDir}${idx}`,
            JSON.stringify(metadata),
            "utf-8"
        )
    }

    const metadataUploadRsp = await uploadDir(metadataDir)
    return metadataUploadRsp.cid
}

async function uploadDir(dir: string): Promise<UploadDirRsp> {
    const dirPath = path.resolve(dir)
    const filePaths = fs.readdirSync(dirPath)
    let files = []
    for (const fileIndex in filePaths) {
        const filename = filePaths[fileIndex]
        const file = await fileFromPath(`${dirPath}/${filename}`)
        files.push(file)
    }

    const nftStorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    const cid = await nftStorage.storeDirectory(files)
    console.log(`upload ${dir} success, cid is ${cid}`)
    return {
        cid: cid.toString(),
        filenames: filePaths,
    }
}

async function fileFromPath(filePath: string) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)!
    return new File([content], path.basename(filePath), { type })
}

const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    /*attributes: [
        {
            trait_type: "category",
            value: "walkingman",
        },
    ],*/
}

main().catch((e) => {
    console.error(e)
    process.exit(1)
})
