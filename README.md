---
title: "Task Management App"
description: "A web-based task management application built as part of the GFE assignment."
link: https://gfe-assign.vercel.app/
---

# Task Management App

This project is a web-based task management application built as part of the GFE assignment. It allows users to manage tasks by creating, reading, updating, and deleting (CRUD) them. The application includes advanced features such as sorting, filtering, pagination, custom fields, bulk actions, and a Kanban board view.

---

## Roadmap & Milestones

### Core Milestones

- [x] **Task Table View**
  - [x] Display a table view of all tasks.

- [x] **Task Management**
  - [x] Create Task: Implemented via a modal form with fields for title, priority, and status.
  - [x] Edit Task: Modify tasks using a modal form that pre-populates existing task data.
  - [x] Delete Task: Remove tasks using a confirmation modal.

- [x] **Sorting & Filtering**
  - [x] Enable sorting by clicking on column headers.
  - [x] Implement text-based search filtering.
  - [x] Allow filtering by status or priority.

- [x] **Pagination**
  - [x] Limit the number of tasks per page (e.g., 10, 20, 30, 40, 50).
  - [x] Provide dynamic page controls with clear indication of the current page.
  - [x] Allow users to adjust the page size dynamically.

- [x] **Local Persistence**
  - [x] Read tasks from localStorage on application load.
  - [x] Update localStorage after every CRUD operation to persist data.

- [x] **Custom Fields**
  - [x] Custom Fields Editor:
    - [x] Provide an interface within the modal form for adding custom fields.
    - [x] Allow users to add new fields with a name, type, and value.
    - [x] Enable deletion and editing of custom fields.
  - [x] Dynamically display custom fields in the task view.
  - [x] Support sorting and filtering by custom fields, ensuring tasks missing custom field data display a default state.

### Additional Milestones

- [x] **Bulk Actions (Milestone 9)**
  - [x] Enable multiselect functionality to perform bulk operations such as bulk editing or deletion.

- [x] **Kanban Board View (Milestone 10)**
  - [x] Provide an alternative Kanban board view where tasks can be dragged and dropped between columns, updating their status and priority.

---

## Overview of the Solution

The main interface utilizes a custom `DataTable` component located at `@/components/data-table/data-table`. This component is designed to provide a flexible and efficient table-based interface for displaying tasks with built-in capabilities for sorting, filtering, and pagination. The application architecture emphasizes clean code, modular design, and robust state management. All the data fetching and updating logic was done in `src/app/_lib/actions.ts` file.

---

## Bonus Milestone Implementations

- **Kanban Board View:**  
  Implemented using `@dnd-kit`, this feature allows users to drag and drop tasks between columns, reflecting changes in task status and priority.

- **Bulk Actions:**  
  The multiselect functionality enables users to select multiple tasks and perform bulk operations, streamlining task management.

---

## Notable Features & Design Decisions

- **URL-Based Filter Queries:**  
  Every filter query is appended to the URL, allowing users to share specific views and ensure consistent data filtering across sessions.

- **Optimistic UI Updates:**  
  In the Kanban board view, a deliberate delay of `1000ms` is introduced to simulate data loading. However, optimistic updates are in place to ensure that the UI remains responsive and reflects changes immediately.

- **Data Table Can be a Server Side Rendered Component:**  
  The Data Table component can be rendered on the server side, allowing for efficient server-side rendering and improved performance. because all the data fetching and updating logic was done in `src/app/_lib/actions.ts` file, and not done in the client side.

---

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Tailwind UI, Shadcn UI
- **State Management & Data Fetching:** React Query
- **Drag & Drop:** @dnd-kit
- **Notifications:** Sonner
- **Icons:** Lucide React

---

## Setup & Installation

1. **Clone the Repository:**

  ```bash
   git clone <repository-url>
   cd <project-directory>
  ```
  
2. **Install Dependencies:**

  ```bash
  npm install

  # or

  yarn install

  # or

  bun install
  ```

3. **Start the Development Server:**

  ```bash
  npm run dev

  # or

  yarn dev

  # or

  bun run dev
  ```

4. **Open the Application:**

  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Live Preview
A live preview of the application is available at [https://gfe-assign.vercel.app/](https://gfe-assign.vercel.app/).

This project demonstrates proficiency in front-end engineering with a focus on clean architecture, best practices in state management, and a commitment to delivering a user-friendly and visually engaging task management experience. Feedback and inquiries are welcome.