# GFE Assignment

### Roadmap

#### Milestones

- [x] **Milestone 1** – Display a table view of all tasks.
- [x] **Milestone 2** – Task management
  - [x] Create a task – *(using a modal form that includes fields for title, priority, and status)*
  - [x] Edit a task – *(using a modal form that includes fields for title, priority, and status)*
  - [x] Delete a task – *(using a modal form for confirmation)*
- [x] **Milestone 3** – Sorting and filtering tasks
  - [x] Enable sorting by clicking on column headers.
  - [x] Implement text-based search filtering.
  - [x] Allow filtering by status or priority.
- [x] **Milestone 4** – Pagination
  - [x] Limit the number of tasks per page *(e.g., 10, 20, 30, 40, 50)*.
  - [x] Change the page controls.
  - [x] Clearly indicate the current page.
  - [x] Allow dynamic adjustment of the page size.
- [x] **Milestone 5** – Local persistence
  - [x] Implement reading from the localstorage.
  - [x] Implement writing to the localstorage.
- [x] **Milestone 6** – Custom fields
  - [x] Add custom fields to tasks
    - [x] Provide an interface within the modal form for adding custom fields.
    - [x] Allow adding new fields with a name, type, and value.
    - [x] Enable deletion of custom fields.
    - [x] Enable editing of custom fields.
  - [x] Dynamically display custom fields in the task view
    - [x] Show custom fields within the task details.
    - [x] Allow users to sort and filter tasks by custom fields.
    - [x] Ensure tasks missing custom field data display a default state.

#### Additional Milestones

- [x] **Milestone 9** – Enable multiselect for bulk actions.
- [x] **Milestone 10** – Create a Kanban board view.

### Overview of the Solution

Table view of all tasks with sorting, filtering, and pagination. is implemented using the custom `DataTable` component from `@/components/data-table/data-table`. The `DataTable` component is a powerful and flexible component that allows you to easily create a table-based interface for displaying and interacting with data.

### Bounus Milestone Implementation

- The bounus milestone implementation is a simple implementation of the bounus milestone requirements. It includes the following features:
  - The bounus milestone implementation includes a Kanban board view that allows users to drag and drop tasks to change their status and priority. The Kanban board view is implemented using `@dnd-kit`
- Multiselect for bulk actions is also implemented in the bounus milestone implementation.


### Interestin things
- Every filter query in passed to URL to filter the data to enable users to share the URL with others and get the same data.
- Kanban board queries takes `1000ms` to load intentionally to show the user that the data is being loaded. but we are created optimistic updates to reduce the loading time and instantly update the UI.


### Tech Stack
Next.js, Tailwind CSS, TypeScript, React Query, Tailwind UI, Dnd Kit, Sonner, Lucide React, Shadcn UI