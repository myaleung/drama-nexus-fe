# User Stories
These user stories provide a comprehensive outline of the features and functionalities Drama Nexus will offer, ensuring the platform caters to the needs of both regular users and admin users while maintaining security, usability, and a niche focus on Korean dramas.

### User Registration

**As a** new user,
**I want** to register using my email address and password.
**So that** I can create a personal account on Drama Nexus

**TESTS**
- [ ] Verify that a new user can register with a valid email address and password.
- [ ] Verify that the system rejects duplicate email addresses.
- [ ] Verify that password strength requirements are enforced.
- [ ] Verify that invalid input messages are sent to the client-side.
- [ ] Verify that a confirmation message to the client-side is sent upon successful registration.

### User Login

**As a** registered user,
**I want** to log in using my email address and password.
**So that** I can access my profile and personalized features

**TESTS**
- [ ] Verify that a registered user can log in with a valid email address and password.
- [ ] Verify that the system rejects incorrect email addresses or passwords.
- [ ] Verify that a user is locked out after a certain number of failed login attempts.
- [ ] Verify that the login session persists until the user logs out or the session expires.
- [ ] Verify that invalid input messages are sent to the client-side.
- [ ] Verify that a confirmation message to the client-side is sent upon successful registration.

### View Profile

**As a** registered user,
**I want** to view my profile information.
**So that** I can see my account details and activity

**TESTS**
- [ ] Verify that a logged-in user can view their profile information.
- [ ] Verify that a non-logged-in user can view other profiles.
- [ ] Verify that profile information is displayed correctly and completely.
- [ ] Verify that profile referenced reviews is displayed correctly.

### Edit Profile

**As a** registered user,
**I want** to edit my profile information.
**So that** I can update my personal details and preferences

**TESTS**
- [ ] Verify that a logged-in user can access their edit profile form.
- [ ] Verify that editable fields can be updated and saved.
- [ ] Verify that changes are reflected in the profile view after saving.
- [ ] Verify that changes are reflected in the database after saving.
- [ ] Verify that the system validates inputs (e.g., correct email format, no empty required fields).

### Update Profile Validation

**As a** registered user,
**I want** my profile updates to be validated.
**So that** I can ensure my information is correct and meets the required format

**TESTS**
- [ ] Verify that the system displays validation errors for invalid inputs.
- [ ] Verify that valid inputs are accepted and saved.
- [ ] Verify that a success message is displayed after a successful update.

### Discover and Search Dramas
**As a** user,
**I want** to search for K-drama titles using a search bar.
**So that** I can easily find specific dramas

**TESTS**
- [ ] Verify that search results match the query and are relevant.
- [ ] Verify that partial matches and case-insensitive searches return correct results.
- [ ] Verify that search results update dynamically as the query changes.

**As a** user,
**I want** to see a slider with the top 10 dramas for the current month.
**So that** I can quickly find highly rated shows

**TESTS**
- [ ] Verify that the top 10 dramas for the current month are displayed in a slider on the home page.
- [ ] Verify that only 10 highly rated dramas show on the slider on the home page.
- [ ] Verify that the slider updates correctly at the beginning of each month.
- [ ] Verify that clicking on a drama in the slider navigates to the drama's detail page.

**As a** user,
**I want** a "Random Pick" button.
**So that** I can get a random drama suggestion when I'm indecisive

**TESTS**
- [ ] Verify that clicking the "Random Pick" button returns one drama series.
- [ ] Verify that the selected drama changes on each click.
- [ ] Verify that the random drama details are displayed correctly.

### Watchlist and Reviews

**As a** registered user,
**I want** to add dramas to my watchlist.
**So that** I can bookmark shows for future viewing

**TESTS**
- [ ] Verify that users can add dramas to their watchlist.
- [ ] Verify that users can view their watchlist from their profile or link on navigation.


**As a** registered user,
**I want** to view and edit my watchlist.
**So that** I can manage my list of bookmarked dramas

**TESTS**
- [ ] Verify that users can remove dramas from their watchlist.
- [ ] Verify that the watchlist reflects changes immediately after edits.

**As a** registered user,
**I want** to add a personal star rating to each drama.
**So that** I can share my opinion and guide others

**TESTS**
- [ ] Verify that logged-in users can add star ratings to dramas.
- [ ] Verify that the rating system prevents multiple ratings from the same user for the same drama.
- [ ] Verify that the average rating updates correctly after new ratings are added.

**As a** registered user,
**I want** to write reviews for dramas I have watched.
**So that** I can share my thoughts and experiences with the community

**TESTS**
- [ ] Verify that logged-in users can write and submit reviews for dramas.
- [ ] Verify that reviews are displayed correctly on the drama's detail page.
- [ ] Verify that reviews can be deleted by the user who posted them.

### Read Reviews

**As a** user,
**I want** to read reviews written by other users.
**So that** I can get insights and recommendations

**TESTS**
- [ ] Verify that users can read reviews for a drama on its detail page.
- [ ] Verify that reviews are sorted by date created.
- [ ] Verify that reviews are displayed with the correct user attribution and rating.

### Drama Information Management (Admin)

**As an** admin user,
**I want** to add new drama titles to the collection.
**So that** I can keep the database up-to-date

**TESTS**
- [ ] Verify that admin users can access the form to add new drama titles.
- [ ] Verify that all required fields are present and validated.
- [ ] Verify that new dramas are added to the database and displayed in search results.

**As an** admin user,
**I want** to edit details of existing dramas.
**So that** I can ensure information accuracy and completeness

**TESTS**
- [ ] Verify that admin users can access and edit existing drama details.
- [ ] Verify that changes are saved and reflected in the drama's profile.
- [ ] Verify that validation is enforced on editable fields.
- [ ] Verify that editable fields can only be updated and saved by admin users.

**As an** admin user,
**I want** to view drama profiles with an "Edit Drama Title" option.
**So that** I can manage drama information effectively

**TESTS**
- [ ] Verify that only admin users can view a drama profile with an "Edit Drama Title" option.
- [ ] Verify that non-editable fields are displayed correctly and cannot be modified.

**As an** admin user
**I want** drama updates to be validated,
**So that** I can ensure information accuracy and format compliance.

**TESTS**
- [ ] Verify that validation errors are displayed for invalid drama updates.
- [ ] Verify that valid updates are accepted and saved.
- [ ] Verify that a success message is displayed after a successful update.

### User Role-Based Access Control

**As an** application developer,
**I want** to implement user role-based access control.
**So that** users only have access to features they are authorized to use

**TESTS**
- [ ] Verify that user roles are correctly assigned (i.e. regular user, admin).
- [ ] Verify that role-based access control restricts features appropriately (e.g., only admins can add/edit dramas).
- [ ] Verify that unauthorized access attempts are logged and handled.

**As an** application developer,
**I want** to authenticate each request via an authentication service.
**So that** only valid requests are processed

**TESTS**
- [ ] Verify that each request includes a valid authentication token.
- [ ] Verify that requests with invalid or missing tokens are rejected.
- [ ] Verify that authenticated requests are processed correctly.


**As a** user,
**I want** unauthorized requests to return a 401 status code with a friendly message.
**So that** I understand when I don't have access to certain features

**TESTS**
- [ ] Verify that unauthorized requests return a 401 status code.
- [ ] Verify that a friendly error message is displayed for unauthorized users.

**As an** application developer,
**I want** backend services to accept requests only from designated front-end servers.
**So that** the application is secure and protected from unauthorized sources

**TESTS**
- [ ] Verify that backend services accept requests only from designated front-end servers.
- [ ] Verify that requests from unauthorized sources are rejected.
- [ ] Verify that invalid data in requests results in a 403 status code.

### Platform Usability and Responsive Design

**As a** user,
**I want** the application to look good on all devices.
**So that** I have a seamless experience regardless of the device I use

**TESTS**
- [ ] Verify that the application layout adjusts correctly on different screen sizes (e.g., mobile, tablet, desktop).
- [ ] Verify that all features are accessible and usable on various devices.
- [ ] Verify that the application looks visually appealing on all supported devices.

**As a** user,
**I want** the application to be accessible.
**So that** all users, including those with disabilities, can use the platform

**TESTS**
- [ ] Verify that the application meets accessibility standards (e.g., WCAG).
- [ ] Verify that users can navigate the application using keyboard-only input.
- [ ] Verify that screen readers can correctly interpret and read out application content.  

## Miro Board
**LINK:** https://miro.com/app/board/uXjVK7AloW4=/?share_link_id=848759818834  
For the project, I used a Miro Board to help organise and collate the documentation.

Here I used a kanban board system to track each user story, break down the requirements for my application and also write some potential test plans. (N.B. Due to a large amount of tasks, screenshot is shows a part snapshot of the whole user story list)  
![Kanban Board](images/kanban.png)

## RESTful Routing
To help plan out the RESTful routes in the project, these have been mapped out in a flow diagram to help digest information and CRUD operations in the database.  
See Miro Board: https://miro.com/app/board/uXjVK7AloW4=/?moveToWidget=3458764592848349897&cot=14

### User Routes
#### GET Members
![GET members](images/get-members.png)
#### GET Member Account
![GET member account](images/get-member-account.png)
#### POST Sign Up Member
![POST Sign Up Member](images/post-signup-member.png)
#### POST Login Member 
![POST Login Member](images/post-login-member.png)
#### PUT Member Account
![PUT Member Account](images/put-member-account.png)
#### GET Member Watchlist
![GET Member Watchlist](images/get-member-watchlist.png)
#### POST Add to Member Watchlist
![ POST Add to Member Watchlist](images/post-add-to-watchlist.png)
#### PATCH Remove from Member Watchlist
![PATCH Remove from Member Watchlist](images/patch-remove-from-watchlist.png)

### Drama Routes
#### POST Drama Review
![POST Drama Review](images/post-drama-review.png)
#### PUT Drama Review
![PUT Drama Review](images/put-drama-review.png)
#### DELETE Drama Review
![DELETE Drama Review](images/delete-drama-review.png)
#### GET All Dramas
![GET All Dramas](images/get-all-dramas.png)
#### GET Drama Title
![GET Drama Title](images/get-drama-title.png)
#### POST Drama Title
![POST Drama Title](images/post-drama-title.png)
#### PUT Drama Title
![PUT Drama Title](images/put-drama-title.png)

## Hierachy
I used my Miro board to produce a hierachy diagram of my site to help visualise useStates and props within my React App. There ended up being a lot of state variables required and props passed due to my child components requiring the data. A lot of my components used the same/similar data and thus I ended up moving user/userprofile date to the main app. Components could therefore access the id of the user where needed.
![Mindmap and web hierachy](images/mindmap-hierachy.png)  
![Homepage](images/homepage.png)  
![Explore Page](images/explorepage.png)  
![Drama Page](images/dramapage.png)  
![Profile Page](images/profilepage.png)  
![Watchlist Page](images/watchlistpage.png)  
![Login Page](images/login.png)
![Sign Up](images/signup.png)

## Gen AI
With the help of generative AI, I had asked if there were any user stories I missed or edge cases I should be aware of to make sure I covered the majority of possible user stories I'd need for the project. If time permits, I will try to incorporate these features such as the 'forgot password' functionality.
![edge cases](images/edge-cases.png)
### Editing Profiles
Due to my schema for users and user profiles being separate, I had trouble updating the user details. I ended up asking help from co-pilot to check where I went wrong and why my `findOneAndUpdate` method wasn't updating correctly.
![findoneupdate help](images/findoneandupdate.png)
The problem ended up being how I was setting the object to update which wasn't being passed through to the update method correctly and thus couldn't match the new information to the old value. With co-pilot's help I update the object as necessary.
![subcategory in object](images/subcategory-object.png)

### Logout
At first my logout was navigating to another route which I needed to change. I wrote a function to remove the cookies and local storage of the user which I needed to call when the 'logout' link was clicked. After changing it to an arrow function I needed to invoke the call on click. I asked co-pilot how this needed to be passed through in my object, which turned out to be a small typo on my react app.
![logout functionality](images/logout.png)  
Co-Pilot recommended me to extract the function in a handler. I also realised the key, value pair wasn't being passed in my code so I ended up rectifying that and passed the 'onClick' function when I rendered my logged in navigation.
![logout in header](images/logout-header.png)

### Reviews
I was originally using regex to check the star rating validation being passed through the request body but it allowed digits higher than 10 to work and thus I asked Co-pilot for some help after not finding the correct Express Validator verification options.  
![rating validation](images/rating-validation.png)  
It told me not to use Regex and to use the option `.isInt` as this directly specifies I'm looking for a number and from what range. This solved my issue.