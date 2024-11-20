import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    console.log('Received contact form submission:', { 
      name, 
      email,
      messageLength: message?.length 
    });

    // Validate the input
    if (!name || !email || !message) {
      console.log('Validation failed:', { 
        hasName: !!name, 
        hasEmail: !!email, 
        hasMessage: !!message 
      });

      return new NextResponse(
        JSON.stringify({
          error: 'Missing required fields',
          details: {
            name: !name ? 'Name is required' : null,
            email: !email ? 'Email is required' : null,
            message: !message ? 'Message is required' : null,
          }
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
      )
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('tm-landing')
    const collection = db.collection('contacts')

    // Store the submission
    const result = await collection.insertOne({
      name,
      email,
      message,
      timestamp: new Date(),
      userAgent: request.headers.get('user-agent'),
      status: 'new'
    })

    console.log('Form submission stored in MongoDB:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      mongoId: result.insertedId
    });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  } catch (error) {
    console.error('Error in contact form submission:', error);

    return new NextResponse(
      JSON.stringify({
        error: 'Failed to submit contact form. Please try again later.',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}
