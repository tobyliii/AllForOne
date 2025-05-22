import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const country = formData.get('country') as string
  const address = formData.get('address') as string
  const file = formData.get('photo') as File

  if (!file) {
    return NextResponse.json({ error: 'Missing file' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY as string),
    scopes: ['https://www.googleapis.com/auth/drive.file'],
  })

  const drive = google.drive({ version: 'v3', auth })
  const folderId = '19Kdr7FUb_RWkzwU99eliVMCzYnNsY0Ub' // Your Google Drive folder ID

  // 1. Upload image file
  const uploadedImage = await drive.files.create({
    requestBody: {
      name: `${name}_${file.name}`,
      parents: [folderId],
    },
    media: {
      mimeType: file.type,
      body: BufferToStream(buffer),
    },
    fields: 'id',
  })

  // 2. Upload metadata as .txt file
  const metadataContent = `
Name: ${name}
Email: ${email}
Country: ${country}
Mailing Address: ${address}
Uploaded File ID: ${uploadedImage.data.id}
`

  const metadataBuffer = Buffer.from(metadataContent, 'utf-8')

  await drive.files.create({
    requestBody: {
      name: `${name}_info.txt`,
      parents: [folderId],
    },
    media: {
      mimeType: 'text/plain',
      body: BufferToStream(metadataBuffer),
    },
  })

  return NextResponse.json({ success: true })
}

// Helper to convert buffer into readable stream
function BufferToStream(buffer: Buffer) {
  const { Readable } = require('stream')
  const stream = new Readable()
  stream.push(buffer)
  stream.push(null)
  return stream
}