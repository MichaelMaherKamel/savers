# Savers - Corporate Portfolio

![Savers Logo](https://cihkzrmbfdbfnbmzslya.supabase.co/storage/v1/object/public/saversbucket//SaversLogo.png)

## 📋 Overview

Savers is a corporate portfolio website showcasing products and services for a company specializing in Printers, Safes, and Lockers. This modern web application is built with a robust tech stack including Next.js 15, TypeScript, and Tailwind CSS to deliver a seamless and responsive user experience.

## 🚀 Features

- **Product Showcase** - Comprehensive display of printer models, safes, and locker systems
- **Service Information** - Detailed descriptions of installation, maintenance, and support services
- **Company Profile** - Information about Savers' history, mission, and expertise
- **Responsive Design** - Optimized viewing experience across all device sizes
- **Authentication System** - Secure user authentication powered by Better-Auth and Supabase
- **Database Integration** - Robust data management with PostgreSQL and Drizzle ORM
- **Admin Dashboard** - Powerful admin interface for managing Categories, Products, and Users
- **User Management** - Complete user administration including password reset, role assignment, and user creation/deletion

## 💻 Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with App Router and TurboPack
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with tailwind-merge and tw-animate-css
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Supabase](https://supabase.com/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Better-Auth](https://github.com/better-auth/better-auth) with Supabase
- **Form Handling**: React Hook Form with Zod validation
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **UI Icons**: [Lucide React](https://lucide.dev/)
- **Toast Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/) (recommended) or npm/yarn/pnpm
- [PostgreSQL](https://www.postgresql.org/) database (or Supabase account)

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_postgres_connection_string
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MichaelMaherKamel/savers.git
   cd savers
   ```

2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```

3. Set up the database:
   ```bash
   bun drizzle-kit push
   # or
   npx drizzle-kit push
   ```

4. Run the development server:
   ```bash
   bun dev
   # or
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🔑 Admin Access

### Accessing the Admin Dashboard

- **Development**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Production**: [https://savers.macrotech.dev/admin](https://savers.macrotech.dev/admin)

### Default Admin Credentials

```
Username: admin
Password: Hello1
```

### Admin Features

The admin dashboard provides complete control over:

- **Categories Management** - Create, edit, and delete product categories
- **Products Management** - Add new products, update details
- **User Management** - Add new users, change roles, reset passwords, and delete accounts

## 📦 Project Structure

```
├───public
│   └───pics
└───src
    ├───app
    │   ├───(admin)
    │   │   └───admin
    │   │       ├───categories
    │   │       ├───clients
    │   │       └───products
    │   │           ├───new
    │   │           └───[id]
    │   ├───(api)
    │   │   └───api
    │   │       └───auth
    │   │           └───[...all]
    │   ├───(auth)
    │   │   └───auth
    │   └───(lobby)
    │       ├───about
    │       ├───clients
    │       ├───contact
    │       ├───products
    │       │   └───[id]
    │       ├───profile
    │       └───test
    ├───components
    │   ├───auth
    │   ├───categories
    │   ├───home
    │   ├───products
    │   ├───sidebar
    │   ├───site
    │   └───ui
    ├───db
    │   └───actions
    ├───hooks
    └───lib
        ├───better-auth
        └───supabase
```

## 🔄 Database Management

This project uses Drizzle ORM with PostgreSQL. You can manage your database schema in `lib/db/schema.ts` and run migrations using the following commands:

```bash
# Generate migration
bun drizzle-kit generate

# Apply migration to the database
bun drizzle-kit push
```

## 🚢 Deployment

The recommended way to deploy this application is using [Vercel](https://vercel.com), the platform from the creators of Next.js:

1. Push your code to a GitHub repository
2. Import the project into Vercel
3. Configure your environment variables
4. Deploy

Alternatively, you can follow the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other deployment options.

## 🧪 Development

```bash
# Run linting
bun lint
# or
npm run lint

# Build for production
bun build
# or
npm run build

# Start production server
bun start
# or
npm run start
```

## 📄 License

[MIT](LICENSE)

## 📞 Contact

Visit us at [https://savers-delta.vercel.app/](https://savers-delta.vercel.app/)

---

Built with ❤️ By [Michael](https://michael.macrotech.dev/)