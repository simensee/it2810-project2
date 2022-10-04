# Team 23 - Prosjekt 2

## Technology
The project is based on Node with use of Node Package Manager (NPM) and is programmed with React and JSX. The project is written with Typescript and styled with Tailwind. The project primarily contains functional components but has one class component which is IssueDetailCard. The context API is used and implemented in DataContext. 

Under “Structure” it is written more detailed about the components and files in the project.

### Use of Tailwind
We have chosen to use Tailwind because it is easier and less complex than using css. You can write the styling directly in the component and therefore have more control, and the rest of the team members can easily access and understand the styling.

### Use of NPM
We chose npm as our JS package manager instead of yarn even though yarn is considered to be faster and more secure then NPM. The difference is that while Yarn installs dependency packages in parallel, NPM installs them sequentially. The choice to choose NPM is also based on the fact that most team members have used it previously.

### Use of Charts JS
We Chart js, which is a free JavaScript HTML5 library, to easily create a HTML-based chart. This is used for visualization of commits, dates and users. 

### Components
* *Components* contains components we see fit to reuse
    * In *Sidebar* lies the components belonging to the sidebar
        * **NavButton** is design for the buttons on the sidebar
        * **Sidebar** gives you the opportunity to navigate between pages by click on the button
    * In *Router* lies routes to navigate between pages
        * **AppRoutes** and **NavRouter** lets you navigate between the pages
        * **ProtectedRoute** makes sure you can not access the pages without giving a valid repository
        * **UnProtectedRoute** shows the login page which you can access even if you don’t have a valid repository
    * In *Pages* are the different pages you can choose between in the navbar. In all of the pages we store different information fetched from the GitLab API. 
        * **LoginPage** lets you write in your repository and token to get access to your repo. Used local storage to store the repository that is written so you don't have to log in each time.
        * **IssuePage** shows issues on a Kanban board. It also shows which issue is closed and opened. Used session storage to store which issue you have chosen as a detail card.
        * **ProgressPage** contains an Overview with charts of the number of commits per user and number of commits per date. Used session storage to store what you have filtered on. You can also filter on date and user.
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

 








