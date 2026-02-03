# Flights Backend

## Setup

### 1. Run the database migration

In **Supabase SQL Editor** (or psql), run the migration file:

```
backend/migrations/001_create_flights.sql
```

This creates the `flights` and `flight_bookings` tables and inserts sample data.

### 2. Configure your PHP backend

The backend expects the `flights` endpoint. The API base URL is:

```
http://localhost/Full_Trip_WS/backend/Kad_Be/index.php?endpoint=flights
```

Adjust the path if your local server uses a different root (e.g. `Full_Trip_WS/Full_Trip_WS/backend/...`).

### 3. Frontend API URL

If your backend URL differs, update `frontend/trip/src/services/flights_service.js`:

```js
const API_BASE = 'http://localhost/YOUR_PATH/backend/Kad_Be/index.php';
```

---

## API Endpoints

### GET – Search flights

**URL:** `?endpoint=flights&from=&to=&departure_date=&return_date=&passengers=&class=`

| Param          | Type   | Required | Description                      |
|----------------|--------|----------|----------------------------------|
| from           | string | ✓        | Departure city or airport        |
| to             | string | ✓        | Arrival city or airport          |
| departure_date | string | ✓        | YYYY-MM-DD                       |
| return_date    | string |          | YYYY-MM-DD (round trip)          |
| passengers     | int    |          | 1–9 (default: 1)                 |
| class          | string |          | Economy, Business, etc.          |

**Response:**
```json
{
  "success": true,
  "data": {
    "outbound": [...],
    "return": [...]
  }
}
```

### POST – Book a flight

**Body (JSON):**
```json
{
  "flight_id": 1,
  "user_email": "user@example.com",
  "passengers": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Flight reserved successfully!",
  "booking_id": 1
}
```
