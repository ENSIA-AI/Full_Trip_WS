const API_URL = 'http://localhost/Full_Trip_WS/backend/Kad_Be/feedback.php';

export async function addFeedback(data) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: data.email,
      feedback: data.feedback
    })
  });
  return res;
}

