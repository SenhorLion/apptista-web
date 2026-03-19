### Monetisation Strategy

You are NOT selling “cloud storage”.

You are selling:

- Backup
- Sync across devices
- Peace of mind
- Professional tracking

### Tier Strategy

**Free (Local Only)**

- Unlimited activities
- Unlimited lessons
- Local only
- Manual export (JSON)
- This builds trust and usage.

**Pro (£3–5/month or £29/year)**

- Cloud sync
- Auto backup
- Multi-device support
- Share activity with trainer
- Payment history report export (PDF)
- Email reminders (future feature)
- Keep it lean initially:
- Just sync + backup is enough.

### Payment Stack

Since you're already using Supabase:

- Use Stripe
- Stripe Checkout

Store subscription tier in user profile

Flow:

- User clicks “Upgrade”
- Stripe checkout
- Webhook updates Supabase users.- subscription_tier
- App switches repository from local → cloud

Clean.

### Upgrade Flow Recommendation

When user upgrades:

Ask:

“Do you want to sync your local data to the cloud?”

Migrate local IndexedDB → Supabase
One-time migration

**Advanced Move (Later)**

You could even:

Keep local IndexedDB for Pro users
Sync in background
Make it fully offline-capable cloud sync

But not needed for MVP.

Your real value isn't tracking lessons.

It’s solving this:

“Trainer says I owe 3 lessons.”
You open app.
“Nope. Paid. Here’s the history.”

That friction is emotional.

That’s worth £3/month.

| Layer         | Recommendation                 |
| ------------- | ------------------------------ |
| Local Storage | IndexedDB via Dexie            |
| Architecture  | Repository pattern abstraction |
| Sync          | Supabase Postgres              |
| Payments      | Stripe                         |
| Pricing       | £29/year sweet spot            |
| MVP Focus     | Local only, zero auth          |
