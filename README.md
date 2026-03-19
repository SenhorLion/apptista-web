# Lesson Tracker App

A comprehensive tennis\* lesson tracking app with a clean audit trail and payment tracking.
Designed to help you maintain clear records and avoid any disputes.

- \*NB: Could be tailored for any activity / lessons that are scheduled and require payment.

### 🔧 **Tech Stack**

- **Frontend**: Nextjs
- **State Management**: Zustand or React Context (lightweight for this use case)
- **UI Library**: Tailwind, shadcn-like component setup
- **Backend**: Supabase (PostgreSQL + Auth + simple API = perfect for MVP)
- **Optional**: Notifications, calendar sync (later phase)

### Key Features

1. Lesson Tracking

- Date, time, and duration for each session
- Lesson types: 1-on-1 or Group
- Status tracking: Scheduled, Completed, or Cancelled
- Notes field for important details like "rained out" or "rescheduled"

2. Payment Management

- Payment status: Paid, Unpaid, or Exempt
- Customizable price per session
- Payment date and method tracking (Cash, Transfer, Card, Check)
- Quick "Mark as Paid" button for unpaid sessions

3. Dashboard Summary

- Unpaid sessions count with total amount due
- Next upcoming session details
- Total sessions tracked

4. Powerful Filters

- View all lessons
- Filter by upcoming, past, unpaid, or cancelled
- Quick access to what matters most

5. Complete Audit Trail

- Every lesson shows when it was last updated
- Payment dates recorded automatically
- Full edit history maintained
- All data persists across sessions

6. Easy Management

- Quick add/edit forms
- One-click payment marking
- Delete with confirmation
- Clean, intuitive interface

The app uses persistent storage, so all your data is saved automatically and will be there when you return. You can easily share screenshots of specific lessons or the summary dashboard to resolve any disputes with your trainer.
