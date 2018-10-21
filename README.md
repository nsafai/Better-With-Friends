# Event Starter

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

**Remaining:**

- [ ] As an organizer I can edit event details (Event Edit/update /w authorization) **WIP, need to add auth check**
- [ ] As an organizer I can delete an event (Event Delete /w authorization)
- [ ] Add background to homepage
- [ ] Polish /events/show.hbs
- [ ] Polish /events/new.hbs (try to mirror show.hbs)
- [ ] User Edit/Update
- [ ] Comments
- [ ] Other links
- [ ] As an organizer, I can press a button to send out venmo charges
- [ ] As an organizer, I can mark off who has paid
- [ ] Make /users page admin-only
- [ ] Polish signup error page

Email feature requests to me@nicolaisafai.com
