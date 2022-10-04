# Team 23 - Prosjekt 2

## Technology
The project is based on Node with use of Node Package Manager (NPM) and is programmed with React and JSX. The project is written with Typescript and styled with Tailwind. The project primarily contains functional components but has one class component which is IssueDetailCard. The context API is used and implemented in DataContext. 

Under “Structure” it is written more detailed about the components and files in the project.

### Use of Tailwind
We have chosen to use Tailwind because it is easier and less complex than using css. You can write the styling directly in the component and therefore have more control, and the rest of the team members can easily access and understand the styling.

### Use of NPM
We chose npm as our JS package manager instead of yarn even though yarn is considered to be faster and more secure then NPM. The difference is that while Yarn installs dependency packages in parallel, NPM installs them sequentially. The choice to choose NPM is also based on the fact that most team members have used it previously.

### Use of Charts.js
We used Chart.js, which is a free JavaScript HTML5 library, to easily create a HTML-based chart. This is used for visualization of commits, dates and users. 

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

## Technical requirements
### Ajax
AJAX comes with React and allows you to request and receive data from a server after an application or web page is loaded. What makes AJAX good for interactive user interfaces is that the various components are loaded independently of each other, and that you can thus update one component in the application, without the remaining components being affected.

We have chosen to use Fetch to handle AJAX calls to GitLab. The choice was between Fetch and the alternative Axios. Fetch was chosen here as it is well documented and therefore easy to get started with. The alternative Axios also had good documentation, especially linked to React, but Fetch was still chosen as it will possibly become the standard, and was good to get started with.

### HTML Web storage
We use Session storage to filter the render of data we fetch from the Gitlab API like issues, users, commits, merge and merge requests on the progress page. We use local storage to store the filtering on time period and selected user. 

### Responsive design 
Viewport
Media-queries
Bilder som skalerer
Flytende/fleksibellayout

### Use of Git
The group has used GitLab and the kanban board for controlling which issues to work on and which issues other team members are working on. Each issue has been created as a branch. Also, for each commit we have used “fix” or “feat” in the beginning of each commit to see if it is a feature or a bug/something to be fixed. 

## To run the project 
## Dependencies
We are using the following dependencies
* NPM
* Tailwind
* Chart

### Tailwind
We have chosen to use Tailwind because it is easier and less complex then using css. You can write the styling directly in the component and therefore have easier access.

### NPM
We chose npm as our JS package manager because it is popular and have a lot of resources. 

## API
The data we are fetching using HTTP-GET requests is:
* Commits
* Branches
* Users

## Testing
We test our project with Jest-test, some of which are snapshot tests. The snapshot test will make sure the data from the API matches expected data. The component test checks if the new components render correctly. 




 








