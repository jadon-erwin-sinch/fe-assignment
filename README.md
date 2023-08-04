### Thoughts and shortcomings

My take on this assignment is using plain React and Styled components.
Unit testing with Jest, Integration testing with Cypress.

I focused a lot on separating the data from app states, by writing individual hooks for each api entity, and then consuming and handling the data in the root `AppProvider`. That way, `useApp` is responsible for throwing errors, keeping track of data lists and toggling states while being fed data from the api hooks.
The point is for these hooks to never invoke each other directly, but to act as tools for actions performed by views and components.

My biggest flaw during this assignment is by far the router handling. Lots has happened since last time I interacted with React Router, and even though I tried my best to configure empty states, loading states, path tracing and so on, I had to focus my time on improving other more essential aspects of the application to stay within the given time frame. I'm sure it'll become more clear next time around.

Due to this, you'll see that I just stacked the 2 modules on top of each other for this assignment. There is no real way of making a mobile friendly version where both the application list and the settings panel are displayed simultaneously, as it is in desktop mode. The application list would instead have to act as a navigation menu and actually navigate the whole view to a "settings page" for things to fit.


### Key takeaways

After reading the task description, my understanding was the following; An application can't be created without having an environment assigned to it, and an environment can't in turn be created without a configuration attached to it.
As a result of this complexity, a lot of time went into making each form section generic enough to be reused in different places. In unison or on their own.

All this led up to an interesting solution of separating all form actions into hooks. Validations and submission callbacks could therefore now be imported anywhere they were needed without actually hosting specific form data.

Speaking of form validation. There are so many ways of doing this, some better than others probably. The way this validation works, is that the inputs get validated for every character you type, but won't actually prompt an error until it's "dirty". Which in this case means once you've tried to submit the form at least once. After that you'll be reactively error prompted until a correct value is provided.

### Things to improve

* Error handling can be refined, prompting custom error messages for different scenarios instead of a generic banner.

* Pagination of the application list, if and when it becomes too long, ideally already done in the backend response.

* The navigation needs improvement, for users to be able to properly refer and link to a specific page or search result.

* Component library can be more generic and reusable. Key elements like dropdowns, inputs and radio buttons can be customized site-wide for a neater look in all browsers.

* Search input deserves a debouncer to minimize number of requests sent.

* Responsive mobile view needs some serious love.


### Available Scripts

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `yarn test`

Run unit and module tests.

#### `yarn test-integration`

Run integration tests with Cypress.
Make sure to run the app server `yarn test` in a separate terminal prior to running this.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed.