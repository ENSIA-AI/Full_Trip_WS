const API_URL = 'http://localhost/Full_Trip_WS/backend/Kad_Be/index.php?endpoint=users';

export async function addUser(userData) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      credentials: 'include',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        country: userData.country,
        state: userData.state,
        currency: userData.currency,
        phone_num: userData.phone_num,
        password: userData.password
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success && data.error) {
      throw new Error(data.error);
    }
    
    // Try to login the user on the server so session cookie is set (best-effort)
    try {
      await fetch('http://localhost/Full_Trip_WS/backend/Kad_Be/routes/login.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userData.email, password: userData.password })
      });
    } catch (err) {
      // ignore login errors (we still return the created user)
      console.warn('Server-side auto-login failed:', err);
    }

    return data;
  } catch (error) {
    // ✅ Better error logging
    console.error('Error in addUser:', error);
    
    // If it's a network error, provide more detail
    if (error.message === 'Failed to fetch') {
      throw new Error('Cannot connect to server. Make sure XAMPP Apache is running.');
    }
    
    throw error;
  }
}