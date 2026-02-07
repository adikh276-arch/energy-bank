Create "Energy Economy" - an energy tracker for chronic illness 
that uses a banking metaphor.

CORE EXPERIENCE (Build these 5 things perfectly):

1. MORNING CHECK-IN
- Full-screen slider (0-100 energy units)
- Animated battery fills as you slide
- 4 zones: 🟢80-100 "Rich", 🟡40-79 "Budget carefully", 
  🟠20-39 "Survival", 🔴0-19 "Emergency"
- Optional tags: slept poorly, pain, flare, good
- Shows: "Expected 65, you have 45. Adjust plans?"
- Saves to localStorage, shows once per day

2. TODAY'S TRACKER
- Large balance at top (animated number, color-coded bar)
- Pre-loaded activity buttons (100+ activities organized by category)
- Tap activity → deducts cost → balance updates with animation
- Transaction log appears below (time, activity, cost, balance)
- When balance hits 0: Big red "DEBT" warning appears
- Negative balance shows in red with "units in debt"

3. "SHOW MY DAY" GENERATOR ⭐ (Make this STUNNING)
- Generates beautiful shareable card with:
  - Header: "A Day in My Life with Chronic Illness"
  - Starting energy vs healthy person (visual comparison)
  - Breakdown of where energy went (beautiful infographic)
  - Current status (surplus or debt)
  - Footer: "This is what invisible disability looks like"
- 3 visual styles: Minimal, Illustrated, Bold
- One-tap copy as image
- Pre-filled with dummy data so users see it immediately

4. WEEKLY INSIGHTS
- Simple line chart (7 days, energy balance)
- Shows 3 insights:
  - "You crash every [day]"
  - "You recover best on [day]"
  - "Healthy person: 200 units. You: 58 avg (29% capacity)"
- Use Recharts LineChart component

5. CRASH MODE
- Red "CRASH" button in bottom corner (always visible)
- When pressed:
  - Screen fades to soft gray
  - Shows only: "You're in survival mode"
  - 3 essential activities: Meds, Bathroom, Water
  - Affirmation: "Rest is not weakness. Your body needs this."
  - Tomorrow's activities auto-marked as "reschedule"

DUMMY DATA (Pre-populate everything):
- Today: 55 units, 6 completed activities, 1 unit debt
- Past 7 days: realistic pattern (Mon-Fri 40-70, Sat-Sun 50-80)
- 100+ activities with costs already in database
- 3 "Show My Day" cards pre-generated in gallery

UI SPECS:
- Colors: Teal primary (#0D9488), Red debt (#DC2626), 
  Green surplus (#059669), Cream bg (#FAFAF9)
- Typography: SF Mono for numbers, Inter for text
- Balance: Always visible, 48px bold, animated transitions
- Activity cards: White, shadow, emoji + name + cost
- Charts: Recharts with teal/red gradient
- Mobile-first, 100% responsive, dark mode toggle

INTERACTIONS:
- Tap activity → Immediate balance update with haptic feel
- Swipe activity card left to delete
- Pull down to refresh balance
- Smooth number counting animations (800ms)
- Transaction slides in from right (300ms)

Make the "Show My Day" feature INCREDIBLE - that's the viral hook.
Everything else is support. This app should make chronically ill 
people cry because they finally feel SEEN.