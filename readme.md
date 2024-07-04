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

## Setup
`npm i`
**Frontend**
`npm run dev`

## Client Access
https://drama-nexus.netlify.app/

## Technologies

Built with
- React
- Tailwind
- Material-Tailwind
- HeadlessUI
- Swiper
- TMBD API

### Attributions
Images and vector graphics from Freepik
Drama information from TMDB