# Drama Nexus
## Introduction
Drama Nexus is a database application tailored for Korean Dramas, where users can write or read reviews and give ratings on their favorite K-dramas. It caters to a niche market, making it easier for drama enthusiasts to find, share, and discuss shows, fostering a focused and vibrant community.

Finding the right K-drama to watch can often be a time-consuming and overwhelming task. Sifting through endless synopses and information to choose the next series to binge on can feel like a chore. Drama Nexus addresses this problem by offering a streamlined, community-driven platform for discovering and exploring Korean dramas.

Our platform helps both newcomers and enthusiasts by providing a list of highly reviewed shows and enabling searches based on genres, new releases, or user interests. For those feeling adventurous, a "Random Pick" button can suggest a show, encouraging users to step out of their comfort zone.

By creating a profile, users can add their reviews and ratings, guiding others in their viewing choices and fostering a supportive community. Members can maintain a private watchlist, bookmarking shows for future viewing, and engaging in discussions with like-minded fans.

Drama Nexus focuses on:

- **Ease of Finding Shows:** Quickly discover new or favourite dramas.
- **Community-Driven Recommendations:** Highlight the best dramas based on genuine community feedback.
- **Niche Market Focus:** Cater specifically to K-drama enthusiasts without the distraction of unrelated content.
- **Succinct Information Consolidation:** Present all necessary information about K-dramas in an easily digestible format.
- **Streaming Availability:** Provide information on where to watch each drama, saving users time.

By promoting a space for cultural exchange, Drama Nexus allows users from different countries to explore and appreciate K-dramas, fostering cross-cultural understanding and appreciation.

## Risks
- **Data Accuracy and Integrity:** If the data isn't monitored, inaccurate or outdated data might be presented to users.
- **API Dependency:** Reliance on external APIs (e.g., The MovieDB API) for data could lead to issues if the API service goes down or changes its terms.
- **Scalability:** Due to the database size used, the platform might not scale well with a growing number of users and data.
- **Community Management:** Inappropriate or harmful user-generated content (e.g., reviews, comments). A moderator or ability to moderate posts before they are posted on the site may need to be included.
- **User Adoption:** Due to the site being young, there may be a low user adoption or engagement due to lack of awareness or interest.

## Impact
- **Data Accuracy and Integrity:** If inaccurate or not succinct data is shown to users, they may lose trust in the platform, leading to decreased user engagement and retention.
- **API Dependency:** If there is a disruption in data availability from the API, it could affect the user experience and functionality of the platform.
- **Scalability:** To be able to scale the site for future traffic flow, cloud-based services that can dynamically scale resources based on demand may need to be implemented which would cause financial costs and technical debt.
- **Platform Reputation:** Poor handling of user data and community issues could damage the platform’s reputation, making it harder to attract new users. This can be mitigated by implementing user-friendly design and continuously gather user feedback for improvements.

## Conclusion
<!-- What I would also have done better/extra -->
I felt that I was over ambitious due to the short timeframe I had to accomplish the proposal I set out to do. However, I quickly prioritised tickets into features (colour coded) and started working on the important features first.

Due to the sheer size of information the database holds, multiple queries did need to be made to it. I felt I should have cached the drama query results to session storage or local storage to help save server load. Although this wasn't realistic and a working site would normally query the database normally. 
I should return the database result in pages and query a set number of pages, especially for the homepage as this wouldn't have needed the full extent of the database.

Testing the application was hard to be done automatically as the way I needed my response to return data was specific and was hard to mock the implementation due to my lack of knowledge.

If I was given more time, I would have liked to include the following features:
### Genre Listings and Search Bar
A dropdown menu of genres linked to page collections of dramas that match. This would allow users to browse different categories based on their tastes. A search bar hosted on the header would have also been helpful in terms of locating a particular drama or titles that matched the query.

### Admin Role
In my proposal, I stated that an admin role would be included. However, due to time constraints this was not implemented; although some of the admin routes and features had been started and added to the platform, they've been put as placeholder until the role has been actioned. Such as adding new dramas and editing information.
Further to the admin role, I'd like to include a '#moderator' role who would monitor and sanction reviews added by users to make sure they were appropriate. 

Further features for the application include:
### Actor Bio Pages
Similar to user profiles, actors would have their own bio page which includes information about then and the dramas they're casted in.

### Personalised Recommendations
After collecting data based on user preferences, what they've reviewed, what they're watchlisting. This data can be used to help recommend members with new titles and drama series they may potentially love.

### Expansion into other Asian dramas
Expand the database to include other types of asian dramas for members to discuss and browse freely.

## Setup
`npm i`
**Frontend**
`cd frontend/`
`npm run dev`
**Backend**
`cd backend/`
`npm run start`     - Start up server

## Technologies

Built with
- React
- MongoDB
- Express
- Tailwind
- Material-Tailwind
- HeadlessUI