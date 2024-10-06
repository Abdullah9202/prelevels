import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'


interface User {

  clerk_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  username: string;
  avatar_url: string | null;
  phone_number: string | null;
  password: string | null;

}

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local'
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occurred', {
      status: 400
    })
  }

  const eventType = evt.type

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data

    if (!id || !email_addresses) {
      return new Response('Error occurred -- missing data', {
        status: 400
      })
    }

    const user: User = {
      
      clerk_id: id,
      first_name: first_name || null,
      last_name: last_name || null,
      email: email_addresses[0].email_address,
      username:`${first_name}${last_name}`,
      avatar_url: image_url || null,
      phone_number: "+923355566939", 
      password: "cda23@_2341d8h3",

    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/student/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Send the user data
      });
      console.log(JSON.stringify(user))
      
      if (!response.ok) {
        console.error('Failed to send data to Python backend');
      } else {
        console.log('Data sent successfully');
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  return new Response('', { status: 200 })
}

// ngrok http --domain=stunning-highly-gnu.ngrok-free.app 3000