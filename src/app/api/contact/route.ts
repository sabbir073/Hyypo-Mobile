import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validators';
import { sendContactNotification } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.issues },
        { status: 400 }
      );
    }

    await sendContactNotification(result.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, errors: [{ message: 'Internal server error' }] },
      { status: 500 }
    );
  }
}
