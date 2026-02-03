const API_BASE = 'http://localhost/Full_Trip_WS/backend/Kad_Be/index.php';

export async function searchFlights(params) {
  const qs = new URLSearchParams({
    from: params.from || '',
    to: params.to || '',
    departure_date: params.departureDate || '',
    return_date: params.returnDate || '',
    passengers: params.passengers ?? 1,
    class: params.flightClass || 'Economy'
  });

  try {
    const res = await fetch(`${API_BASE}?endpoint=flights&${qs}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.errors?.join(', ') || 'Search failed');
    }
    if (!data.success) {
      throw new Error(data.errors ? Object.values(data.errors).join(', ') : 'Search failed');
    }
    return data;
  } catch (error) {
    console.error('Flights search error:', error);
    throw error;
  }
}

export async function bookFlight(flightId, userEmail = '', passengers = 1) {
  try {
    const res = await fetch(`${API_BASE}?endpoint=flights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        flight_id: flightId,
        user_email: userEmail,
        passengers
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || data.errors ? Object.values(data.errors).join(', ') : 'Booking failed');
    }
    if (!data.success) {
      throw new Error(data.error || 'Booking failed');
    }
    return data;
  } catch (error) {
    console.error('Flight booking error:', error);
    throw error;
  }
}
