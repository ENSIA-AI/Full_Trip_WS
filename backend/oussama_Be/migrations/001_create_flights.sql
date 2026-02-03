-- Flights backend migration
-- Run this in your Supabase SQL Editor or psql to create the flights tables

-- Flights table
CREATE TABLE IF NOT EXISTS flights (
  id SERIAL PRIMARY KEY,
  airline_name VARCHAR(100) NOT NULL,
  flight_number VARCHAR(20) NOT NULL,
  departure_airport VARCHAR(100) NOT NULL,
  departure_city VARCHAR(100) NOT NULL,
  arrival_airport VARCHAR(100) NOT NULL,
  arrival_city VARCHAR(100) NOT NULL,
  departure_time TIMESTAMP NOT NULL,
  arrival_time TIMESTAMP NOT NULL,
  duration_minutes INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  class VARCHAR(50) NOT NULL DEFAULT 'Economy',
  status VARCHAR(20) NOT NULL DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Flight bookings table
CREATE TABLE IF NOT EXISTS flight_bookings (
  id SERIAL PRIMARY KEY,
  flight_id INT REFERENCES flights(id) ON DELETE CASCADE,
  user_email VARCHAR(255),
  passengers INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for search performance
CREATE INDEX IF NOT EXISTS idx_flights_departure ON flights(departure_city, departure_airport);
CREATE INDEX IF NOT EXISTS idx_flights_arrival ON flights(arrival_city, arrival_airport);
CREATE INDEX IF NOT EXISTS idx_flights_departure_time ON flights(departure_time);
CREATE INDEX IF NOT EXISTS idx_flights_class ON flights(class);

-- Sample seed data for testing
INSERT INTO flights (airline_name, flight_number, departure_airport, departure_city, arrival_airport, arrival_city, departure_time, arrival_time, duration_minutes, price, class, status) VALUES
('Emirates Airlines', 'EK-460', 'DXB', 'Dubai', 'LHR', 'London', '2025-11-02 08:00:00', '2025-11-02 14:30:00', 390, 399.00, 'Economy', 'Active'),
('British Airways', 'BA-117', 'JFK', 'New York', 'LAX', 'Los Angeles', '2025-11-02 10:00:00', '2025-11-02 13:30:00', 330, 299.00, 'Economy', 'Active'),
('Air France', 'AF-006', 'CDG', 'Paris', 'JFK', 'New York', '2025-11-02 14:00:00', '2025-11-02 17:30:00', 450, 549.00, 'Economy', 'Active'),
('Emirates Airlines', 'EK-203', 'LHR', 'London', 'DXB', 'Dubai', '2025-11-03 09:00:00', '2025-11-03 19:30:00', 450, 399.00, 'Economy', 'Active'),
('Qatar Airways', 'QR-701', 'DOH', 'Doha', 'SIN', 'Singapore', '2025-11-02 02:00:00', '2025-11-02 14:30:00', 510, 429.00, 'Economy', 'Active'),
('Lufthansa', 'LH-400', 'FRA', 'Frankfurt', 'NRT', 'Tokyo', '2025-11-02 22:00:00', '2025-11-03 15:00:00', 660, 699.00, 'Economy', 'Active'),
('United Airlines', 'UA-101', 'LAX', 'Los Angeles', 'JFK', 'New York', '2025-11-02 07:00:00', '2025-11-02 15:30:00', 330, 249.00, 'Economy', 'Active'),
('Delta Air Lines', 'DL-200', 'ATL', 'Atlanta', 'CDG', 'Paris', '2025-11-02 18:00:00', '2025-11-03 08:00:00', 480, 599.00, 'Economy', 'Active');
