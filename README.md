# Team 23 - Prosjekt 2
## To run the project 
1. Navigate to the root of the project which is the name of your repo
2. Run npm install
3. Run npm start

### To use the web application
* Log in with the ID of your repo and an access token.
* On the left you will have a navigation bar, to choose what information you want to see.
    * Users: Click on a user to get more information
    * Progress: The Overview will show you the same information without considering the filters you have chosen. Merge request and commits will only show you information about the selected user. Therefore you have to choose a user in the blue button on the right to load information.
    * Issues: Overview of all the issues in the repo, both opened and closed. If the repo uses the labels “Todo”, “Done” and “Doing” these will show in their respective column. If the repo does not use these labels, the “Done”-column will still include all closed issues. This page will sometimes be slow loading, but this was not something we were able to solve
    * Log out: Signes out of the repo 

## Technology
The project is based on Node with use of Node Package Manager (NPM) and is programmed with React and JSX. The project is written with Typescript and styled with Tailwind. The project primarily contains functional components but has one class component which is IssueDetailCard. The context API is used and implemented in DataContext. 

### Use of Tailwind
We have chosen to use Tailwind because it is easier and less complex than using css. You can write the styling directly in the component and therefore have more control, and the rest of the team members can easily access and understand the styling.

### Use of NPM
We chose npm as our JS package manager instead of yarn even though yarn is considered to be faster and more secure than NPM. The difference is that while Yarn installs dependency packages in parallel, NPM installs them sequentially. The choice to choose NPM is also based on the fact that most team members have used it previously.

### Use of Charts.js
We used Chart.js, which is a free JavaScript HTML5 library, to easily create a HTML-based chart. This is used for visualization of commits, dates and users. 

### Components
* *Components* contains components we see fit to reuse
    * In *Sidebar* lies the components belonging to the sidebar
        * **NavButton** is design for the buttons on the sidebar
        * **Sidebar** gives you the opportunity to navigate between pages by button-clicks.
    * In *Router* lies routes to navigate between pages
        * **AppRoutes** and **NavRouter** lets you navigate between the pages
        * **ProtectedRoute** makes sure you can not access the pages without giving a valid repository
        * **UnProtectedRoute** shows the login page which you can access even if you don’t have a valid repository
    * In *Pages* are the different pages you can choose between in the navbar. In all of the pages we store different information fetched from the GitLab API. 
        * **LoginPage** lets you write in your repository and token to get access to your repo. Used local storage to store the repository that is written so you don't have to log in each time.
        * **IssuePage** shows issues on a Kanban board. It also shows which issue is closed and opened. Used session storage to store which issue you have chosen as a detail card.
        * **ProgressPage** contains *ProgressPageComponents* which you can read more about under the bulletpoint *ProgressPageComponents*. 
        * **UsersPage** contains cards of all the users in the repository. Used session storage to store the last user you have clicked on. If you click on one card you get more detailed information about the user which is UserDetailCard.
    * In *ProgressPageComponents* lies the components you can view on the ProgressPage
        * **Overview** shows two charts implemented from the Chart.js library. One Line chart showing number of commits each date. One Pie chart showing the number of commits for each user.
        * **CommitList** shows the total commits belonging to the repository. Here you can filter on different parameters.
        * **MergeRQList** shows the total of merge requests.
    * In *DetailCards* lies files for detailed information about Issues, MergeRequest and Users
        * **IssueDetailCard** is implemented as a class component, which was a requirement.  
        * **MergeDetailCard**, UserDetailCard are cards with more detailed information about merge requests and users.
    * In **DetailCards** lies files for detailed information about Issues, MergeRequest and Users
        * **IssueDetailCard** is implemented as a class component, which was a requirement.  
        * **MergeDetailCard**, **UserDetailCard** are cards with more detailed information about merge requests and users.
* In **Resources** lies context provider and interfaces
    * **DataContext** contains RESTAPI and produces global variables
    * **ResponseTypes** contains interfaces (global variables) with the property names/responses from RESTAPI. These are the property names the interface object can have.

## Technical requirements
### Ajax
AJAX comes with React and allows you to request and receive data from a server after an application or web page is loaded. What makes AJAX good for interactive user interfaces is that the various components are loaded independently of each other, and that you can thus update one component in the application, without the remaining components being affected.

We have chosen to use Fetch to handle AJAX calls to GitLab. The choice was between Fetch and the alternative Axios. Fetch was chosen here as it is well documented and therefore easy to get started with. The alternative Axios also had good documentation, especially linked to React, but Fetch was still chosen as it will possibly become the standard, and was good to get started with.

### HTML Web storage
We used both session storage and local storage in this project. Session storage is used for storing filter parameters in the different pages, so that when swapping in between pages, the previous filters are still set. In the user page, the highlighted user is still selected when switching pages, the same goes for commits and merge requests. The filtering parameters are the dates and user on the progress page.

Local storage is used for storing the repo id and the repo access token from the user. A "logged in" status is also stored, all this ensures that even when the browser is closed, the user is still logged in the next time the page is opened. A user is "logged in" until they press the log out button.

### Context provider
The context provider api is used quite extensively in this project. All data fetched from the api is stored here, and is then available from every component in the app without the need for multiple fetch queries or passing down props. The fetching itself occurs after logging in the protected route component.

The context api was used in this fashion because, as mentioned above, the data inside is accessible from every child component. This is preferable to passing the api data down to children as props. Another reason is as mentioned that all api fetching can be done in bulk, and only once. This causes an initial delay when the page is loaded, and all data is then accessible instantly wherever and whenever it is needed.

We encountered a few problems with this approach, as the context provider really is not optimal for storing large amounts of data. A prominent problem was that we were unable to overwrite data in the context, the repo id and token which was needed for fetching then had to be stored by pushing and popping from a list.

### Responsive design
Viewport is used when setting the size of the page itself in the index.css file.
Tailwind implements media-queries with shortcuts (sm:, md:, lg:) indicating the screen size. These shortcuts where then used for creating layouts that fit the corresponding screen size.
Flexbox and grids where used in most parts of the styling to create a flexible layout.
We do not have a picture with scaling. This could have been implemented on the users profile pictures, but was not prioritized.

### Routing
In order to make this project an SPA, we used the library react-router-dom and the component hash-router. The webpage consists of two main routes, protected and unprotected. The protected route is only accessible if a user has logged in, and checks the aforementioned "logged in" status stored in local storage. The unprotected route is the log in page, if a user is not logged in and tries to access the protected routes via url, they are redirected to the log in page.
There was an issue with rerouting to the protected routes after a successful log in, the log in status was updated but the page did not redirect. After some testing we found that a simple refresh of the page directed us to the protected route as intended. The solution then was to force reload the page after a successful log in. Not a delicate solution, but it works.

### Use of Git
The group has used GitLab and the Kanban-board for controlling which issues to work on and which issues other team members are working on. Each issue has been created as a branch. Also, for each commit we have used “fix” or “feat” in the beginning of each commit to see if it is a feature or a bug/something to be fixed. 

## Testing
We test our project with Jest-test, some of which are snapshot tests. The snapshot test will make sure the data from the API matches expected data. The component test checks if the new components render correctly. 
