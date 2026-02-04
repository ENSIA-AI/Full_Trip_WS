const API_URL = 'http://localhost/Full_Trip_WS/backend/Kad_Be/index.php?endpoint=feedback';

export async function addFeedback(data) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        feedback: data.feedback
      })
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to submit feedback');
    }
    
    return await res.json();
  } catch (error) {
    console.error('Feedback submission error:', error);
    throw error;
  }
}