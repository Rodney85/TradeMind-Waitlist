import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    console.log('Received request with email:', email);

    if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
      console.error('Missing environment variables:', {
        hasApiKey: !!process.env.BEEHIIV_API_KEY,
        hasPublicationId: !!process.env.BEEHIIV_PUBLICATION_ID
      });
      throw new Error('Missing required configuration');
    }

    if (!email) {
      return new NextResponse(
        JSON.stringify({ message: 'Email is required' }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Using the correct Beehiiv API v2 endpoint for email subscriptions
    const beehiivUrl = `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`;

    const requestBody = {
      email: email,
      reactivate_existing: false,
      send_welcome_email: true,
      utm_source: 'website',
      utm_medium: 'waitlist'
    };

    console.log('Sending request to Beehiiv:', {
      url: beehiivUrl,
      body: requestBody,
      hasApiKey: !!process.env.BEEHIIV_API_KEY
    });

    const beehiivResponse = await fetch(beehiivUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Beehiiv response status:', beehiivResponse.status);
    
    const responseText = await beehiivResponse.text();
    console.log('Raw response:', responseText);
    
    let responseData = null;
    try {
      if (responseText) {
        responseData = JSON.parse(responseText);
      }
    } catch (parseError) {
      console.error('Failed to parse response:', {
        error: parseError,
        responseText: responseText
      });
    }

    if (!beehiivResponse.ok) {
      console.error('Beehiiv API Error:', {
        status: beehiivResponse.status,
        data: responseData,
        text: responseText
      });
      return new NextResponse(
        JSON.stringify({ 
          message: responseData?.message || 'Failed to subscribe',
          error: responseData || responseText
        }),
        { 
          status: beehiivResponse.status,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ 
        message: 'Successfully subscribed',
        data: responseData 
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Detailed server error:', {
      error: error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error
    });
    
    return new NextResponse(
      JSON.stringify({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
