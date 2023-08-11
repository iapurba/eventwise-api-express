# eventwise-api

#### Event Ticketing and Management App Backend Services

This repository contains the backend services for our event ticketing and management application, built using Node.js and Express. The services provide a scalable and robust foundation for managing various aspects of event discovery, ticket booking, and user interaction.

#### Key Features:

- __Event Management:__ Create, update, and manage a wide range of events, from concerts to workshops.
- __Ticketing System:__ Seamless ticket booking process with multiple ticket types and secure payment integration.
- __User Authentication:__ Implement user registration and authentication to secure user accounts.
- __API Gateway:__ Efficiently route incoming requests to the appropriate microservices for event-related actions.
- __Database Integration:__ Utilize databases to store event information, user profiles, and transaction data.
- __Notification Services:__ Keep users informed with event updates, booking confirmations, and reminders.
- __Review and Ratings:__ Allow users to provide feedback and rate events they've attended.
- __Scalability:__ Designed with a microservices architecture to ensure easy scaling and maintenance.

#### Getting Started:
       
1. Clone this repository.
2. Install Node.js and required dependencies using __`npm install`__.
3. Set up environment variables for configuration (database connection, APIs, etc.).
4. Run the services using __`npm start`__.

Feel free to explore the codebase, customize the services, and contribute to enhancing the event ticketing and management experience.

For more information and detailed documentation, refer to the specific service directories within this repository.

1. #### Authentication and User Management: 
    - User Registration: __`POST /api/users/register`__
    - User Login: __`POST /api/users/login`__
    - User Profile: __`GET /api/users/:userId`__
    - Update User Profile: __`PUT /api/users/:userId`__
    - Delete User Profile: __`DELETE /api/users/:userId`__

2. #### Event Management:
    - Create Event: __`POST /api/events`__
    - Update Event: __`PUT /api/events/:eventId`__
    - Delete Event: __`DELETE /api/events/:eventId`__
    - Get All Events: __`GET /api/events`__
    - Get Event Details: __`GET /api/events/:eventId`__
    - Get Events by Date Range: __`GET /api/events?start_date=yyyy-mm-dd&end_date=yyyy-mm-dd`__
    - Get Events by Location: __`GET /api/events?location=city`__
    - Get Events by Category: __`GET /api/events?category=category_name`__

3. #### Ticket Booking:
    - Get Available Events: __`GET /api/events/available`__
    - Book Tickets: __`POST /api/bookings`__
    - Get Booking Details: __`GET /api/bookings/:bookingId`__
    - Cancel Booking: __`DELETE /api/bookings/:bookingId`__

4. #### Payment Integration:
    - Create Payment Intent: __`POST /api/payments/create-intent`__
    - Confirm Payment: __`POST /api/payments/confirm`__

5. #### User Bookings and History:
    - Get User's Bookings: __`GET /api/users/:userId/bookings`__
    - Get User's Booking History: __`GET /api/users/:userId/booking-history`__

6. #### Reviews and Ratings:
    - Leave a Review: __`POST /api/reviews`__
    - Get Event Reviews: __`GET /api/reviews/event/:eventId`__

7. #### Search and Filters:
    - Search Events: __`GET /api/events/search?q=search_query`__
    - Filter Events by Category: __`GET /api/events/category/:categoryName`__
    - Filter Events by Date: __`GET /api/events/date/:date`__

8. #### Admin Panel:
    - Get All Users: __`GET /api/admin/users`__
    - Get All Bookings: __`GET /api/admin/bookings`__
    - Get All Events: __`GET /api/admin/events`__
    - Get All Reviews: __`GET /api/admin/reviews`__

9. #### Organizer Management:
    - Organizer Registration: __`POST /api/organizers/register`__
    - Organizer Login: __`POST /api/organizers/login`__
    - Organizer Profile: __`GET /api/organizers/:organizerId`__
    - Update Organizer Profile: __`PUT /api/organizers/:organizerId`__
    - Create Organizer Event: __`POST /api/organizers/events`__
    - Update Organizer Event: __`PUT /api/organizers/events/:eventId`__
    - Delete Organizer Event: __`DELETE /api/organizers/events/:eventId`__
    - Get Organizer Events: __`GET /api/organizers/:organizerId/events`__

10. #### Notifications:
    - Send Notification: __`POST /api/notifications`__
    - Error Handling:

11. #### Others:
    - View Event Categories: __`GET /api/categories`__
    - Search and Filter Options: __`GET /api/filters`__
