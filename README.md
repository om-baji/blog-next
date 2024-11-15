# Blogs Mate

Blogs Mate is a modern blog platform built with Next.js, Prisma, and Postgres that allows users to create, read, update, and delete blog posts. The platform features user authentication with GitHub and Google via NextAuth, as well as a fully responsive design using ShadCN and Tailwind CSS.

## Features

- **User Authentication**: Secure login and signup with Google and GitHub using NextAuth.
- **Post Management**: Create, read, update, and delete blog posts.
- **Profile Management**: Each user has a dedicated profile page where they can manage their information and view their posts.
- **Responsive Design**: Tailwind CSS and ShadCN are used to ensure the application is mobile-friendly and looks great on any device.
- **Server Actions**: Efficient server-side operations using server actions to handle requests.
- **Prisma ORM**: Utilizes Prisma to interact with a Postgres database, making it easy to perform database operations.

## Tech Stack

- **Frontend**: Next.js, ShadCN, Tailwind CSS
- **Backend**: Next.js server actions, Prisma ORM, Postgres database
- **Authentication**: NextAuth (GitHub and Google providers)
- **Database**: Postgres, managed with Prisma ORM

## Installation

To get started with Blogs Mate, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/blogs-mate.git
    cd blogs-mate
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up your environment variables in a `.env` file:
    ```
    DATABASE_URL=your_postgres_database_url
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=your_nextauth_secret
    GITHUB_ID=your_github_client_id
    GITHUB_SECRET=your_github_client_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    ```

4. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

Your app will be running at `http://localhost:3000`.

## Snipets

![Screenshot_20241020_112615](https://github.com/user-attachments/assets/c9315265-6f49-4c9f-9feb-b0f4b493bf04)
![Screenshot_20241020_112856](https://github.com/user-attachments/assets/ddb409b5-135b-4e7d-baf4-3eb07393a934)
![Screenshot_20241020_112704](https://github.com/user-attachments/assets/f4305f47-a407-42a2-bd39-6c9798c1a810)
![Screenshot_20241020_112643](https://github.com/user-attachments/assets/01f9fe0e-27a2-4233-95e7-ed6dd9da95a8)


