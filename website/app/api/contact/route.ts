import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MongoClient } from 'mongodb'

export async function POST(request: Request) {
  let client: MongoClient | null = null;
  
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Connect to MongoDB
    client = await clientPromise
    const db = client.db('tm-landing-page')
    
    // Insert the contact form submission
    const result = await db.collection('contacts').insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    })

    console.log('Successfully saved contact form:', { id: result.insertedId });

    return NextResponse.json({ 
      success: true, 
      id: result.insertedId,
      message: 'Contact form submitted successfully' 
    })
  } catch (error) {
    console.error('Detailed error in contact form submission:', {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack
      } : error,
      mongoClientConnected: !!client
    });

    return NextResponse.json(
      { 
        error: 'Failed to submit contact form. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
