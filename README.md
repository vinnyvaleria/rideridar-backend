# Rideridar

**Rideridar (Ridevanta)** A modern luxury web app for booking executive private rides. Focused on seamless user experience and backend integration.

![Rideridar Dashboard](/rideridar-backend/assets/images/dashboard.png)

You may check out the frontend repository [here](https://github.com/Josephdeepu1982/rideridar-frontend).

## 🎯 Project Objective

This backend powers an **exclusive car ride booking application**.  
It handles the **end-to-end booking and flow**, from customer form submission to driver assignment and ride completion, with admin oversight and a driver dashboard.

## 🛠 Features

### 1️⃣ Booking Creation

**Customer Flow:**

1. **Select Booking Type**

    - _Flight Transfer_ → Provide flight details plus pickup/dropoff.
    - _Local Transfer_ → Provide pickup/dropoff only.

2. **Select Vehicle Type**

    - Based on number of seats, max passengers and max luggage.

3. **Enter Passenger & Contact Details**

    - Name
    - WhatsApp number
    - Email address
    - Number of passengers
    - Guest names
    - Terminal/gate info (if flight)
    - Luggage count
    - Optional gate pickup request (Meet & Greet)
    - Agree to booking terms and deposit policy

4. **Booking Review**

    - Displays summary of details input by customers..

5. **Booking Confirmation**
    - (TBD) Generates a unique **booking number**.
    - Displays confirmation page visible to the customer.

---

### 2️⃣ Dashboard & Management

**Admin & Driver Flow:**

-   **Overview Page:**  
    Entry point for account access.

-   **Account Details:**  
    Admin can view and update account info.

-   **Booking Management:**

    -   View all bookings.
    -   View booking details (form details, assigned driver, payment status).
    -   (TBD) Mark booking deposit as received.
    -   Assign or update drivers for bookings.
    -   (TBD) Send invoice after ride completion.
    -   (TBD) Mark full payment as received.

-   **Driver Management:**

    -   View all drivers.
    -   View driver details (name, phone, vehicle type/model/plate, assigned bookings).
    -   Only visible to admins.

-   **(TBD) Driver Actions:**
    -   Drivers log in to view assigned rides.
    -   Mark rides as **Started** or **Completed**.
    -   Driver order page is visible during ride progress.

## 🧪 Technologies Used

-   **Framework:** [Node.js](https://nodejs.org/en) + [Express](https://expressjs.com/)
-   **Database:** [MongoDB](https://cloud.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
-   **Hashing:** [crypto-js](https://www.npmjs.com/package/crypto-js)
-   **Authentication:** [JWT](https://www.jwt.io/) for Admin/Driver accounts
-   **API:** RESTful endpoints for booking creation, updates, driver actions

## 🥪 How to Use Locally

```bash

# Clone the repository
git clone https://github.com/vinnyvaleria/rideridar-backend.git
cd rideridar-backend

# Install dependencies
npm install

# Set up your environment
# Create a .env file at the root of the project and add:
DATABASE_URL = link_to_mongodb
SECRET = your_key_here

# Start the development server
npm start

```

Use http://localhost:3000 to test the server response.

## 📌 Endpoints

### ✈️ Booking Routes

| Method | Endpoint                     | Description               |
| ------ | ---------------------------- | ------------------------- |
| `POST` | `/booking`                   | Create a new booking      |
| `GET`  | `/booking`                   | Retrieve all bookings     |
| `GET`  | `/booking/:id`               | Get single booking detail |
| `PUT`  | `/booking/:id/assign-driver` | Assign or update driver   |

---

### 👨‍✈️ Driver Routes

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| `GET`  | `/driver`          | Show all drivers              |
| `GET`  | `/driver/filter`   | Show filtered drivers         |
| `GET`  | `/driver/:id`      | Show single driver by ID      |
| `POST` | `/driver/register` | Register new driver           |
| `POST` | `/driver/login`    | Login driver                  |
| `POST` | `/driver/logout`   | Logout driver (JWT protected) |

---

### 🧑‍💼 Admin Routes

| Method | Endpoint          | Description                  |
| ------ | ----------------- | ---------------------------- |
| `GET`  | `/admin`          | Show all admins              |
| `GET`  | `/admin/:id`      | Show single admin by ID      |
| `POST` | `/admin/register` | Register new admin           |
| `POST` | `/admin/login`    | Login admin                  |
| `POST` | `/admin/logout`   | Logout admin (JWT protected) |

## 🚀 Future Enhancements

### ✅ Booking & Customer Validation

-   Validate passenger count does not exceed vehicle capacity.
-   Track total customer bookings for airport rides.

### ✅ Authentication & Accounts

-   Use email-only login for both admin and driver accounts.
-   Complete admin account management (profile update, password change, role assignment).
-   Generate readable text passwords for new accounts.

### ✅ Phone Number Input

-   Remove hardcoded `+65` prefix; allow flexible international formats.

### ✅ Admin Dashboard UX

-   Add filter/search options for bookings and drivers.
-   Add clear CTA buttons on overview page.
-   Display booking & driver info in tables.
-   Add export to Excel (admin only).

### ✅ Driver Dashboard UX

-   Add “Upcoming Rides” view.
-   Use light mode color palette.

### ✅ Integrations

-   Integrate real-time Flight API for airport ride data.
-   Add Telegram/Discord bot notifications for bookings.

### ✅ Payments

-   Integrate secure payment gateway for customer payments at booking.
-   Add booking status page for customers to track progress.

### ✅ Role & Status Management

-   Enable admins to assign roles.
-   Manage booking status updates.

---

## 🙌 References and Credits

-   Hosted DB: [MongoDB](https://cloud.mongodb.com/)
-   UI Components: [Chakra UI v3](https://chakra-ui.com/)

Designed and developed by **Vinny Valeria and Deepu Joseph**

## 📚 License

This project is for personal and educational use. All assets and source code are owned by the developer unless otherwise stated.
