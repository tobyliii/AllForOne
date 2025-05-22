'use server'

import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { writeFile } from 'fs/promises'
import path from 'path'
import { tmpdir } from 'os'
import fs from 'fs'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file: File | null = formData.get('file') as unknown as File

    if (!file) {
      return NextResponse.json({ error: 'No file received' }, { status: 400 })
    }

    // Save uploaded file temporarily
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const tempPath = path.join(tmpdir(), file.name)
    await writeFile(tempPath, buffer)

    // Authenticate with Google Drive API
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'credentials.json'), // path to your JSON key file
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    })

    const drive = google.drive({ version: 'v3', auth })

    // Upload the file to Drive
    const res = await drive.files.create({
      requestBody: {
        name: file.name,
        parents: ['19Kdr7FUb_RWkzwU99eliVMCzYnNsY0Ub'], // replace with your folder ID
      },
      media: {
        mimeType: file.type,
        body: fs.createReadStream(tempPath),
      },
    })

    // Cleanup temporary file
    fs.unlinkSync(tempPath)

    return NextResponse.json({ success: true, fileId: res.data.id })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}