# eventwise-api

1. ## Authentication and User Management: 
    - User Registration: __`POST /api/users/register`__
    - User Login: __`POST /api/users/login`__
    - User Profile: __`GET /api/users/:userId`__
    - Update User Profile: __`PUT /api/users/:userId`__

2. ## Event Management:
    - Create Event: __`POST /api/events`__
    - Update Event: __`PUT /api/events/:eventId`__
    - Delete Event: __`DELETE /api/events/:eventId`__
    - Get All Events: __`GET /api/events`__
    - Get Event Details: __`GET /api/events/:eventId`__

3. ## Ticket Booking:
    - Get Available Events: __`GET /api/events/available`__
    - Book Tickets: __`POST /api/bookings`__
    - Get Booking Details: __`GET /api/bookings/:bookingId`__
    - Cancel Booking: __`DELETE /api/bookings/:bookingId`__

4. ## Payment Integration:
    - Create Payment Intent: __`POST /api/payments/create-intent`__
    - Confirm Payment: __`POST /api/payments/confirm`__

5. ## User Bookings and History:
    - Get User's Bookings: __`GET /api/users/:userId/bookings`__
    - Get User's Booking History: __`GET /api/users/:userId/booking-history`__

6. ## Reviews and Ratings:
    - Leave a Review: __`POST /api/reviews`__
    - Get Event Reviews: __`GET /api/reviews/event/:eventId`__

7. ## Search and Filters:
    - Search Events: __`GET /api/events/search`__
    - Filter Events by Category: __`GET /api/events/category/:categoryName`__
    - Filter Events by Date: __`GET /api/events/date/:date`__

8. ## Admin Panel:
    - Get All Users: __`GET /api/admin/users`__
    - Get All Bookings: __`GET /api/admin/bookings`__
    - Get All Events: __`GET /api/admin/events`__
    - Get All Reviews: __`GET /api/admin/reviews`__

9. ## Notifications:
    - Send Notification: __`POST /api/notifications`__
    - Error Handling:

10. ## Others:
    - View Event Categories: __`GET /api/categories`__
    - Search and Filter Options: __`GET /api/filters`__
