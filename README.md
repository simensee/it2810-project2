# Team 23 - Prosjekt 2


## How to use this web application
### Users
On this page you will get an overview of all the useres registerd on your project. 
* By clicking on one of the users you will get more information about this users contribution on the right side of your screen. 

### Progress
#### Overview
On this page you will find an overview of the project progres measured by commmits. 
* You can select 

### Issues

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
* IssueCard and UserCard are cards for each issue and each user in the repository with limited information and is also clickable.
* IssueLabel is the design of the label in the IssueCard
* Components contains components we see fit to reuse
    * Dropdown is a component for dropdown menu






