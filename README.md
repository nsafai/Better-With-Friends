# Better with Friends

### Summary
Crowdfunding for small events with Friends

### Pages
/ (home)
/events (list of events)
/events/new (create new event)
/events/:id (look up specific event)
/events/:id/edit (edit specific event)
/events/:id/manage (view event attendees -- coming soon)
/users (list of all users, admin-only)
/users/new (create new user)
/signup (create new user)
/login (login for existing users)

### Technologies
Express, NodeJS, Handlebars, Mongoose, MongoDB

### To-do

**Done:**

- [x] As a website visitor, I can create an account
- [x] As a website visitor, I can login
- [x] As an organizer, I can create an event.
- [x] As a website visitor, I can view all events
- [x] As a user, I can join an event. (Event PUT (update))
- [x] As an organizer, I can see Venmo handles for a specific event
- [x] Write copy
- [x] By Fri Oct 19: Slides
- [x] By EOW: Ship to Heroku
- [x] Polish /events/index.hbs
- [x] As an organizer I can edit event details (Event Edit/update /w authorization)

**Remaining:**

- [ ] When I'm prompted to login, the action I was trying to perform is not lost, and I'm re-directed appropriately
- [ ] As an organizer I can delete an event (Event Delete /w authorization)
- [ ] Add background to homepage
- [ ] Polish /events/show.hbs
- [ ] Polish /events/new.hbs (try to mirror show.hbs)
- [ ] User Edit/Update
- [ ] As a user, I can comment on an events page
- [ ] As an organizer, I have an events/:id/admin page that gives me a clickable button to charge people for the event, and keep track of who has completed the charge
- [ ] As an organizer, I can add other links (like a spreadsheet, or doodle responses) to my events/:id/admin page
- [ ] As an organizer, I can press a button to send out venmo charges
- [ ] As an organizer, I can mark off who has paid
- [ ] Make /users page admin-only
- [ ] Polish signup error page

Email feature requests to me@nicolaisafai.com
