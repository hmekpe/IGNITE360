export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message) {
      return Response.json({ error: 'Please complete your name, email, and message.' }, { status: 400 });
    }

    return Response.json({
      message: 'Thank you for your message. We will get back to you soon.',
    }, { status: 200 });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
