# TN CONNECT: Project Documentation

**Version:** 1.0
**Status:** In Development
**Document Owner:** Project Team Lead
**Last Updated:** May 2026

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Goals and Objectives](#2-goals-and-objectives)
3. [Target Users](#3-target-users)
4. [System Architecture Overview](#4-system-architecture-overview)
5. [Application Modules](#5-application-modules)
   * 5.1 [Public Website](#51-public-website)
   * 5.2 [Member Registration and OTP Verification](#52-member-registration-and-otp-verification)
   * 5.3 [Member Authentication](#53-member-authentication)
   * 5.4 [Member Dashboard and Profile](#54-member-dashboard-and-profile)
   * 5.5 [Admin Backend Portal](#55-admin-backend-portal)
6. [Data Architecture](#6-data-architecture)
7. [Security Architecture](#7-security-architecture)
8. [External Integrations](#8-external-integrations)
9. [Performance and Hosting](#9-performance-and-hosting)
10. [Frontend Team: Roles and Responsibilities](#10-frontend-team-roles-and-responsibilities)
    * 10.1 [Dev 1: Public Website](#101-dev-1-public-website)
    * 10.2 [Dev 2: Member Portal](#102-dev-2-member-portal)
    * 10.3 [Dev 3: Admin Backend Portal](#103-dev-3-admin-backend-portal)
    * 10.4 [Shared Frontend Responsibilities](#104-shared-frontend-responsibilities)
    * 10.5 [Cross-Team Collaboration Rules](#105-cross-team-collaboration-rules)
11. [Project Phases and Timeline](#11-project-phases-and-timeline)
12. [Deliverables Checklist](#12-deliverables-checklist)
13. [Glossary](#13-glossary)

## 1. Project Overview

TN CONNECT started from a simple problem: keeping track of a growing student community across different schools and programmes was becoming messy and manual. Spreadsheets were getting out of hand, there was no easy way for students to update their own information, and administrators had no reliable way to know who was actually active. This platform is the solution to all of that.

At its heart, TN CONNECT is a digital home for the community. Students come here to register as members, confirm their identity through their phone number, and manage their personal profiles. The experience is designed to feel straightforward, not like filling out government paperwork. If a student can use WhatsApp, they can use TN CONNECT.

But the platform is more than just a registration form. Behind the scenes, there is a full administration portal that gives the organisation real visibility into its membership. Admins can search for anyone, filter by school or programme, see who is verified and who is not, and export reports whenever they need them. Every admin action is logged, so there is always a clear record of who did what.

The whole thing runs in the browser. Whether someone opens it on a cheap Android phone, a tablet, or a laptop, it should look good and work properly. We are building this with the assumption that not everyone has the latest device or the fastest internet connection, so performance and simplicity are taken seriously throughout.

## 2. Goals and Objectives

It helps to be clear about what we are actually trying to achieve here, both for the people building it and the people who will use it.

**For Members**

We want registration to feel easy and quick. Students should be able to sign up, verify their phone number, and be done in a few minutes. Once they are in, they should be able to update their own information without having to contact anyone. Their account should be secure without making them jump through unnecessary hoops.

**For Administrators**

Admins should never have to dig through a messy list to find someone. The search and filter tools should make it fast to find exactly who they are looking for. Managing accounts, whether that means editing a detail, deactivating someone, or exporting a report for a meeting, should take seconds, not minutes. And when questions come up about who changed what, the audit log should have the answer.

**For the Organisation**

The platform needs to grow with the community. If membership doubles in a year, the system should handle it without anyone noticing. Data should be safe and backed up. And the team running it should spend less time on admin tasks and more time on things that actually matter.

## 3. Target Users

Two very different groups of people will use TN CONNECT, and the platform needs to work well for both of them.

**Members**

Members are students. They might be registering on a slow mobile connection at home, or quickly filling in a form between classes. They are not necessarily tech-savvy, and they should not need to be. The registration flow is designed to guide them step by step, explain what is being asked and why, and give them clear feedback if something goes wrong.

Most members will only interact with the platform a handful of times: once to register, occasionally to update their information, and maybe to check their profile. The experience should be smooth enough that none of those interactions feel like a chore.

**Administrators**

Administrators are staff members who have been given access by the organisation. They are comfortable using web-based tools and they have real work to do, so the admin portal is built to be efficient rather than flashy. They need to find people quickly, take actions without too many unnecessary clicks, and trust that what they see is accurate and up to date.

The platform supports more than one administrator at a time, and not all admins will have the same level of access. A senior admin might be able to delete records and export data, while a junior admin can only view and edit. The system handles this gracefully so nobody accidentally does something they should not.

## 4. System Architecture Overview

TN CONNECT is built in layers, where each layer has one clear job and talks to the layers next to it through well-defined interfaces. This makes the system much easier to maintain, debug, and scale over time, because a problem in one layer does not automatically become a problem everywhere.

**Client Layer**

This is everything the user actually sees. There are three separate applications living inside one codebase: the public website that anyone can visit, the member portal that only logged-in members can access, and the admin portal that only authorised administrators can use. They share the same design system and component library so they look and feel like one coherent product, even though their functionality is very different.

All three are built with React.js and Next.js, styled with Tailwind CSS, and designed to work on any screen size from a small phone to a wide desktop monitor.

**API Gateway**

Think of the API gateway as the front door to the entire backend. Every request from the frontend goes through here first. The gateway checks whether the request is authenticated, validates the incoming data, applies rate limits to prevent abuse, and then routes the request to whichever backend service needs to handle it. This means each individual service does not have to worry about authentication or validation on its own.

**Backend Services**

Rather than one giant backend doing everything, TN CONNECT uses separate services for separate concerns. The authentication service handles login and token management. The OTP service manages the sending and verification of phone codes. The member service handles all the data about members. The admin service manages administrator accounts and permissions. The notification service sends SMS messages and emails. The export service generates downloadable reports. Each of these can be updated or scaled independently without touching the others.

**Data Layer**

All persistent data lives here. The main database (MySQL or PostgreSQL) stores member records, admin accounts, audit logs, and session data. Redis, an in-memory store, handles short-lived things like OTP codes and session references that need to be read and written very fast. File storage handles backups and any uploaded content.

**External Integrations**

The platform connects to Twilio (or a similar provider) for SMS delivery, an SMTP service for email, and a cloud hosting provider with CDN support to keep the site fast for users in different locations.

## 5. Application Modules

### 5.1 Public Website

The public website is the first thing anyone sees when they hear about TN CONNECT and look it up. It needs to make a good impression and make it obvious what the community is about and how to join. There is no login required to browse it.

**Home Page**

This is the most visited page on the entire platform, and it needs to do its job well. The hero section leads with a clear headline that tells visitors exactly what TN CONNECT is and invites them to register. Below that, a features section highlights what membership offers. The overall tone is welcoming and modern, appropriate for a student community rather than a corporate directory.

**About Page**

The about page gives the platform context and legitimacy. It explains who TN CONNECT is for, what the organisation stands for, and why the community exists. A prospective member who is on the fence about registering should come away from this page feeling confident that this is worth their time.

**Contact and Support Page**

Sometimes people have questions or run into problems, and this page is where they go. It includes a simple contact form so anyone can send a message to the team. The form connects to the backend so submitted messages are actually delivered, not just lost.

**Registration and Sign In**

The public website is also where new members start their registration and where existing members sign in. These entry points are prominent and clearly labelled so people do not have to hunt for them. The registration flow itself is covered in detail in the next section.

All public pages are built with SEO in mind. Proper semantic HTML, descriptive page titles, meta descriptions, and Open Graph tags are included so the platform can be found through search engines and shared cleanly on social media.

### 5.2 Member Registration and OTP Verification

Getting someone registered should feel easy, even though several things are happening behind the scenes. The registration process is broken into three clear steps so it never feels overwhelming.

**Step One: Collecting Member Information**

The first thing a new member sees is a form asking for their details. We ask for their full name, school name, programme or course, and phone number. Email address is optional but useful if they want to receive notifications. They also choose a password and confirm it.

Every field is checked before the form is submitted. If a phone number is in the wrong format, or the passwords do not match, the member is told immediately rather than after hitting submit and waiting. The password field includes a visual strength indicator so people know whether their chosen password is strong enough.

**Step Two: OTP Verification**

Once the form is submitted, the system sends a six-digit code to the phone number the member provided. They are taken to a verification screen where they enter that code.

The screen shows a countdown timer so they know exactly how long the code is valid before it expires (typically five minutes). If the timer runs out before they enter the code, a resend button becomes available so they can get a fresh one. If they enter the wrong code too many times, the verification is locked and they need to start again. This is a deliberate security measure to prevent anyone from trying to guess codes.

**Step Three: Confirmation**

When the code is accepted, the member's account is created and marked as verified. They are shown a confirmation screen and then directed either to the sign-in page or straight into their dashboard, depending on how we decide to handle that redirect.

### 5.3 Member Authentication

**Signing In**

Members sign in with either their phone number or their email address (if they provided one), combined with their password. There is a "Remember Me" option that keeps them logged in for longer on devices they trust.

**Forgot Password**

It happens to everyone. When a member cannot remember their password, they can enter their phone number or email and receive a reset link or code. They then choose a new password and confirm it. The whole thing takes under a minute.

**Session Management**

Sessions do not last forever for security reasons. If a member has been inactive for a while, their session times out. When that happens, they see a message letting them know and are prompted to sign back in. If they were in the middle of something, the system does its best to bring them back to where they were.

**How Tokens Work**

When a member logs in, the system issues a JSON Web Token (JWT) that acts as their proof of identity for future requests. This token is stored securely and sent with every request to a protected part of the platform. The API gateway checks the token before allowing any action to proceed. Tokens carry just enough information to do their job (the user's ID and role) and they expire after a set period.

### 5.4 Member Dashboard and Profile

Once a member is signed in, they land on their personal dashboard. This area belongs to them and only they can access it.

**Dashboard Home**

The dashboard gives members a quick summary of their membership. They can see their name, school, programme, phone number, whether their account is verified, and whether it is active. This is a read-only view, designed to give members a clear picture at a glance without overwhelming them with options.

**Editing Their Profile**

Members who need to update their information can do so from the edit profile page. The form comes pre-filled with their current details so they only need to change what has actually changed. They can update their name, school, programme, and email address. Their phone number, once verified, is shown but cannot be changed through this form since changing it would require going through verification again, which is intentional.

**Changing Their Password**

Changing a password is straightforward. The member enters their current password to confirm it is really them, then enters and confirms a new one. The new password has to meet the same strength requirements as the original.

**Logging Out**

The logout button ends the session cleanly. The token is invalidated on the backend, the session state is cleared on the frontend, and the member is taken back to the public home page.

### 5.5 Admin Backend Portal

The admin portal is a completely separate part of the platform. It has its own URL, its own login page, and its own navigation. It is not linked from the public website, and regular members cannot access it even if they know the URL, because their tokens do not carry admin privileges.

**Logging In as an Admin**

The admin login page looks similar to the member login but operates independently. Admin accounts are created internally by the organisation, not through public registration. When an admin logs in, they receive a token that identifies them as an administrator and includes their specific role level.

**Who Can Do What**

Not every administrator has the same permissions. A super admin can do everything: view all members, edit records, delete accounts, export data, and read audit logs. A standard admin might be limited to viewing and editing only. The frontend hides or disables controls that a particular admin is not allowed to use, and the backend enforces the exact same rules independently so there is no way to circumvent them by manipulating the frontend.

**Admin Dashboard**

When an admin logs in, the first thing they see is a summary of the membership base. This includes the total number of registered members, how many are verified, how many are active, and how many joined recently. There is also a short list of the most recent registrations so admins can keep an eye on new sign-ups without having to search.

**Managing Members**

The member management table is the main tool admins use every day. It shows all registered members in a clean, paginated table. Every column can be sorted. Clicking on any row opens a detailed view of that member.

From the detail view, an admin can edit the member's information directly, activate or deactivate their account, or delete their record entirely. Deletion requires confirmation, because accidents happen and we want to make sure nobody removes a record by mistake.

**Search and Filtering**

The search bar makes it fast to find a specific person. Results update as the admin types, without needing to press enter or reload the page. For more complex queries, the filter panel lets admins combine multiple filters: by school, programme, verification status, account status, and date range. Active filters are shown clearly so admins always know exactly what they are looking at, and they can remove any individual filter or clear them all at once.

**Exporting Data**

When the organisation needs member data for a report, a meeting, or an external process, admins can export whatever they are currently looking at as a CSV or Excel file. The export respects the active search and filters, so if an admin has filtered to show only verified members from a particular school, that is exactly what gets exported. They do not have to download everything and sort it out themselves afterwards.

**Audit Logs**

Every action an admin takes is recorded. The audit log shows who did what and when, in chronological order. It can be filtered by date range and by which admin performed the action. The log is read-only, meaning no one can go in and tidy it up after the fact. This is intentional: the point of an audit log is that it tells the truth about what happened.

## 6. Data Architecture

The data side of TN CONNECT is designed to be straightforward, secure, and efficient. Everything is stored in a relational database with a clear structure, and short-lived data like OTP codes and sessions live in a fast in-memory cache.

**Members Table**

This is the most important table in the system. Each member has a unique ID, their full name, school, programme, phone number, optional email address, hashed password, OTP verification status, account status (active or inactive), the timestamp of when they registered, and the timestamp of when they last logged in. Personal details like phone numbers and email addresses are treated as sensitive data throughout.

**Administrators Table**

This table stores all admin accounts. Each record holds the admin's unique ID, name, email, hashed password, their role level, when the account was created, and when they last logged in.

**OTP Records**

OTP codes are temporary and do not need to live in the main database. They are stored in Redis with an expiry time so they automatically disappear once they are no longer valid. Each record is tied to a phone number and also tracks how many failed attempts have been made against it.

**Audit Log Table**

Every admin action gets a row in this table. The record captures what type of action was taken, which member was affected, which admin did it, and the exact timestamp. Nothing is ever deleted from this table.

**Sessions**

Active sessions are tracked in Redis. When someone logs out or their session expires, their session record is removed. This makes it fast to check whether a session is valid and easy to invalidate sessions instantly when needed.

## 7. Security Architecture

Security is not something we bolt on at the end. It is woven into every part of how TN CONNECT is built. Here is how the major risks are handled.

**Passwords**

No password is ever stored as plain text. Every password goes through bcrypt hashing with a salt before it is saved. Even if someone were to gain access to the database directly, they would not be able to read anyone's password.

**OTP Codes**

OTP codes are randomly generated and expire after a short window. Each code can only be used once. If someone enters the wrong code too many times in a row, the system locks the verification and they have to start over. This prevents anyone from simply trying every possible combination.

**Authentication Tokens**

JWT tokens are signed with a secret key, which means they cannot be tampered with without the system noticing. Every token has an expiry time. Admin tokens carry a role claim that backend services check independently, so even if a member somehow obtained an admin-facing URL, their token would be rejected.

**Input Validation**

Every piece of data that comes into the system is checked twice: once on the frontend to give users immediate feedback, and again on the backend to make sure nothing unexpected slips through. This matters because the frontend can be bypassed by anyone who knows how to make a direct API call.

**SQL Injection Protection**

The system uses parameterised queries and ORM tools throughout, which means user input can never be interpreted as part of a database command. This is one of the most common attack vectors on web applications, and it is fully covered.

**XSS Protection**

Any content that comes from a user and gets displayed in the browser is sanitised before rendering. React provides a strong baseline here because it escapes dynamic content by default, which eliminates a whole class of cross-site scripting vulnerabilities.

**CSRF Protection**

The system applies either CSRF tokens or strict SameSite cookie policies to ensure that requests to the API can only come from the TN CONNECT frontend, not from a malicious third-party site trying to act on behalf of a logged-in user.

**Rate Limiting**

The API gateway limits how many requests can be made to sensitive endpoints in a given time window. The OTP endpoint and the login endpoint are the most important ones here, since those are the most tempting targets for automated attacks.

**Admin Access**

The admin portal URL is not published or linked anywhere publicly. Admin sessions expire faster than member sessions. Every admin action is logged. These three things together make it much harder for the admin portal to be abused, even if credentials were somehow compromised.

## 8. External Integrations

TN CONNECT connects to a small number of external services to handle things it does not need to manage itself.

**SMS Gateway**

Sending SMS messages requires a telecom connection that TN CONNECT does not build from scratch. Instead, the platform integrates with a service like Twilio that handles the actual message delivery. The notification service sits in between, so if the organisation ever needs to switch providers, only that one service needs to be updated. Nothing else in the system changes.

**Email**

For members who provide an email address, the platform can send notifications through a standard SMTP-compatible email service. This covers things like registration confirmations, password reset links, and other account communications.

**Cloud Hosting and CDN**

The platform is hosted on a cloud provider that supports automatic scaling, so it can handle more traffic without manual intervention. A content delivery network serves static files like images and scripts from servers close to the user, which means the site loads faster regardless of where someone is accessing it from.

## 9. Performance and Hosting

A platform that is slow or unreliable loses users quickly. These are the practices in place to make sure TN CONNECT stays fast and available.

**Frontend Performance**

Next.js handles server-side rendering and static generation out of the box. This means pages can start loading content before the browser has finished running JavaScript, which is a significant speed improvement especially on slower devices. Images are lazy-loaded so they do not slow down the initial page load. JavaScript bundles are split by page so users only download what they actually need.

**Backend Performance**

The backend services are stateless, which means they can be replicated and run in parallel without any special coordination between instances. If traffic increases, more instances can be added. Redis caching absorbs repeated reads for data that changes infrequently, which keeps pressure off the main database.

**Database Performance**

The fields that get queried most often, such as phone number, school, programme, and verification status, are indexed in the database. This makes filtering and searching fast even when the membership grows into the thousands.

**Reliability and Backups**

The database is backed up automatically every day. Backup files are stored separately so a problem with the main server cannot take the backups down with it. Monitoring is configured to alert the team immediately if something goes wrong, whether that is an error spike, unexpected downtime, or unusual behaviour.

## 10. Frontend Team: Roles and Responsibilities

The frontend team has three developers, and the work has been divided so that each person owns one of the three main application areas: the public website, the member portal, and the admin portal. This keeps things clean. Each developer knows exactly what they are responsible for, merge conflicts are minimised because people are mostly working in separate parts of the codebase, and all three areas can be developed at the same time.

That said, everyone works in the same repository and shares the same design system and component library. Code reviews happen before anything gets merged. The team is collaborative, not siloed.

### 10.1 Dev 1: Public Website

**Ownership Area:** Everything a visitor sees before they log in.

Dev 1 carries two important responsibilities at once: setting up the entire project so the other two developers can hit the ground running, and building the public website that will be the first thing anyone sees when they encounter TN CONNECT.

**Primary Responsibilities**

The first week or so is about laying the foundation for everyone. Dev 1 initialises the Next.js project, sets up Tailwind CSS, configures ESLint and Prettier, establishes the folder structure, and creates the shared component library that Dev 2 and Dev 3 will build on top of. Buttons, inputs, cards, modals, toasts, spinners: all of these need to exist and work properly before the other developers can really get started. This is not glamorous work, but it is load-bearing.

Once the foundations are solid, Dev 1 builds the public website. The home page is the most important deliverable here. It needs to immediately communicate what TN CONNECT is, why a student should care, and how to join. Dev 1 makes the design decisions that set the visual tone for the whole platform. A clear hero section, a benefits overview, and a strong call-to-action are the essentials.

The about page gives the platform its voice and context. The contact and support page includes a working contact form that actually delivers messages to the team. Both pages need to be polished and easy to read.

Dev 1 also builds the registration flow, which is among the more complex pieces of work on the public side. This is a multi-step process: the information form in step one, the OTP verification screen with its countdown timer and resend logic in step two, and the confirmation screen in step three. Every error state needs to be handled gracefully. Dev 1 works directly with the backend developer to confirm the API contracts for the registration and OTP endpoints before building the verification step.

The sign-in page and the forgot password and reset password flow also live here. Dev 1 coordinates with Dev 2 on where members land after a successful login.

Finally, Dev 1 handles SEO configuration across all public pages: meta tags, Open Graph data, page titles. These things matter for discoverability and should not be an afterthought.

**Collaboration Points**

Dev 1 hands off stable shared components to Dev 2 and Dev 3 as they are ready, making sure nothing blocks the other developers from starting their own areas. Dev 1 coordinates with Dev 2 on the post-login redirect behaviour. Dev 1 locks in the registration and OTP API contract with the backend developer before step two of the registration flow is built.

**Key Deliverables**

* Initialised and configured Next.js project
* Shared design system and component library
* Home page
* About page
* Contact and support page with a working contact form
* Multi-step registration form including OTP verification
* Sign-in page
* Forgot password and reset password flow
* Responsive global navigation

### 10.2 Dev 2: Member Portal

**Ownership Area:** Everything a signed-in member sees and interacts with.

Dev 2 is building the part of the platform that members will actually live in. It is the area they come back to. It needs to be reliable, fast, and easy to navigate, whether someone is on a phone or a laptop.

**Primary Responsibilities**

Before building any portal pages, Dev 2 sets up the authentication infrastructure for the entire project. This is shared work: both the member portal and the admin portal depend on it. Dev 2 builds the authentication state management system (using React Context or something like Zustand) that holds the current user's session information after login. This covers the user's identity, their verification status, and their token. The "Remember Me" setting from the sign-in form affects how long this state persists.

Dev 2 also builds the protected route mechanism. This is the logic that checks whether a visitor is authenticated before allowing them to see a protected page. If someone who is not logged in tries to navigate directly to a member portal URL, they get redirected to the sign-in page instead. Dev 3 will use this same pattern for the admin portal, so it needs to be built in a way that is easy to extend.

With the infrastructure in place, Dev 2 builds the member-facing pages. The dashboard home is what members see right after logging in. It shows their name, school, programme, phone number, verification badge, and account status. There are quick links to the edit profile page and the change password page.

The edit profile page is pre-filled with whatever the member currently has on record. They can update their name, school, programme, and email. The phone number is visible but locked, since changing it requires a new verification. The form communicates clearly when a save is successful and when something goes wrong.

The change password page has three fields: current password, new password, and confirm new password. The backend verifies the current password before accepting the new one.

Dev 2 handles session timeout gracefully. When a session is close to expiring, the member sees a gentle prompt giving them the option to stay logged in. If the session does expire while they are on a page, they see a clear explanation and are directed to sign in again.

The navigation inside the member portal is Dev 2's responsibility too. On desktop, this is a sidebar. On mobile, it becomes a bottom navigation bar. Both feel natural on their respective devices.

**Collaboration Points**

Dev 2 shares the authentication state management code with Dev 3 so it can be extended for admin sessions without being rebuilt. Dev 2 coordinates with Dev 1 on the sign-in flow and where members land after logging in. Dev 2 confirms the shape of the user data returned by the backend's login and profile endpoints before building the dashboard.

**Key Deliverables**

* Authentication state management system, shared across all portal apps
* Protected route mechanism with redirect logic
* Member dashboard home page
* Edit profile page with pre-filled form and API integration
* Change password page with validation
* Session timeout handling
* Logout functionality
* Responsive navigation for the member portal

### 10.3 Dev 3: Admin Backend Portal

**Ownership Area:** Everything an administrator sees and interacts with in the admin portal.

Dev 3 has the most technically demanding frontend work in the project. The admin portal is data-heavy and feature-rich, with complex table logic, real-time search, multi-filter support, and several different admin actions to handle. It is also the area where getting things wrong has the most visible impact, since admins are making real decisions based on what they see.

**Primary Responsibilities**

The admin portal lives at a separate route within the Next.js project. It uses the authentication infrastructure Dev 2 built but applies its own admin-specific logic on top of it.

The admin login page is Dev 3's starting point. It sits at its own URL, is not linked from the public site, and operates independently from the member login. After a successful admin login, the user is redirected to the admin dashboard rather than any member-facing page.

Role-based access control on the frontend is Dev 3's responsibility. When an admin logs in, their token includes a claim that describes their role. Dev 3 reads this claim and uses it to show or hide certain controls. A standard admin does not see the delete button or the export button if their role does not permit those actions. This is a UX layer, not a security layer. The backend enforces the same rules independently, so nothing can be bypassed by inspecting or modifying the frontend. But the frontend should still hide what is not allowed, because showing people buttons they cannot use is just confusing.

The admin dashboard is the first thing an admin sees after logging in. It shows summary cards with key membership numbers: total members, how many are verified, how many are active, and how many joined recently. There is also a short feed of the most recent registrations for a quick daily check.

The member management table is the centrepiece of the admin portal and the most complex component in the entire project. It is a full-featured, paginated, sortable data table. Each column header can be clicked to sort the table by that field. The table uses server-side pagination, meaning it requests one page of results at a time from the backend rather than loading everything at once. This is important for performance as the membership grows. Clicking on any row opens a member detail panel.

The member detail panel shows everything about that member and provides the action buttons for that account. Edit opens an inline form. Activate or deactivate toggles the account status. Delete brings up a confirmation dialog before anything is removed. Dev 3 makes sure the confirmation step is prominent enough that admins actually read it before clicking through.

The filter panel sits alongside the table and lets admins combine multiple filters at once: by school, by programme, by verification status, by account status, and by registration date range. The active filters are shown as visible tags so admins always know what they are looking at. Individual filters can be cleared one by one, or all at once.

The search bar queries the backend in near real time as the admin types. Dev 3 implements this with a debounce so the system is not firing a new API request with every single keystroke.

The export button generates a download of whatever the admin is currently looking at, filtered and searched, as a CSV or Excel file. The file is generated by the backend. Dev 3 handles triggering the download in the browser cleanly.

The audit log viewer is a separate table showing all recorded admin actions in reverse chronological order. Dev 3 builds this with filters for date range and for which admin performed the action. The table is read-only. There are no edit or delete controls anywhere near it.

**Collaboration Points**

Dev 3 works closely with the backend developer to nail down the API contract for the member list endpoint, including exactly how filters and pagination parameters are passed and what the response shape looks like. Dev 3 extends Dev 2's authentication system for admin-specific session handling. Dev 3 may ask Dev 1 for shared components like the Modal and Toast as needed.

**Key Deliverables**

* Admin login page
* Role-based UI access control
* Admin dashboard with summary statistics
* Full-featured member management table with sorting and server-side pagination
* Filter panel with multi-filter support
* Real-time debounced search bar
* Member detail panel with edit, activate, deactivate, and delete actions
* Data export to CSV and Excel
* Audit log viewer with date and admin filters

### 10.4 Shared Frontend Responsibilities

Owning an area does not mean working in isolation. There are a few things all three developers are jointly responsible for, and these need to be actively coordinated rather than assumed to happen on their own.

**Design System and Component Library**

Dev 1 builds the initial component library, but once the project is underway, all three developers maintain it. If Dev 2 needs a component that does not exist yet, they either build it in the shared library or raise it with Dev 1. Nobody builds a one-off component that should really be shared. Consistency across the three apps depends on this discipline.

**Error Handling**

Every page that calls an API needs to handle three states: loading, success, and error. None of these should be left blank or silently ignored. The shared Toast component is the standard way to communicate feedback to users across all three apps. Everyone uses it, nobody invents their own.

**Accessibility**

All three developers are responsible for building accessible pages. Keyboard navigation should work throughout. Interactive elements need ARIA labels. Form inputs need associated labels. Error messages need to be connected to their fields programmatically so screen readers can announce them. This is not optional and it is not something to go back and fix later.

**Code Reviews**

Nobody merges their own work without a review from at least one other team member. Reviews are not just about catching bugs. They are also how the team stays aligned on code style, component usage, and responsiveness. The team lead is available for reviews on anything high-stakes.

### 10.5 Cross-Team Collaboration Rules

The frontend and backend teams will be working in parallel for much of this project. These rules exist so they do not end up blocking each other.

**API Contract First**

Before any frontend developer builds a page that depends on a backend endpoint, the contract for that endpoint needs to be agreed on in writing. That means the URL, the HTTP method, the shape of the request, and the shape of both the success and error responses. The backend developer publishes these in a Swagger spec or equivalent, and the frontend team references it throughout development. Surprises at integration time are avoidable if this discipline is maintained from the start.

**Build Against Mocks**

Frontend developers do not sit on their hands waiting for the backend to be ready. Everyone uses mock data or a local mock API server during early development. When the real endpoint is ready, swapping from mock to live is straightforward. This way all three frontend developers can make genuine progress from week one.

**Environment Variables**

API base URLs, SMS gateway keys, and anything environment-specific go in environment variable files. Nothing like that gets hardcoded in the source. Each developer has their own local environment file that never gets committed to the repository.

**Branch Strategy**

Each developer works on feature branches named after the specific feature being built. Feature branches get merged into the development branch through pull requests after review. The development branch gets merged into main only when the team lead signs off. This keeps the main branch clean and deployable at all times.

## 11. Project Phases and Timeline

The project runs across five phases. Some phases overlap because not every team member is blocked by the same things at the same time.

**Phase 1: Foundation (Weeks 1 to 2)**

This phase is about making sure everyone can work. Dev 1 sets up the project, the toolchain, and the shared component library. Dev 2 designs the authentication state management architecture. Dev 3 reviews the admin portal requirements in detail and starts thinking through the data table design. The backend team commits to and publishes the API contracts during this window, so the frontend team has something concrete to build against from week two onwards.

**Phase 2: Authentication Flows (Weeks 2 to 3)**

Dev 1 builds the registration and OTP verification flow, plus the sign-in and password reset flow. Dev 2 connects the post-login routing and starts building the structure of the member portal. Dev 3 builds the admin login page and the role-based access control layer on the frontend.

**Phase 3: Core Member Experience (Weeks 3 to 4)**

Dev 1 finishes all the public website pages. Dev 2 builds the member dashboard, the edit profile page, and the change password page. Dev 3 starts building the member management table, initially working against mock data.

**Phase 4: Admin Portal (Weeks 4 to 6)**

Dev 3 completes the full admin portal: the filter panel, search bar, member detail panel, export functionality, and audit log viewer. Dev 1 and Dev 2 are available during this phase to contribute shared components and conduct code reviews, since their own primary work is largely complete.

**Phase 5: Quality Assurance and Handoff (Weeks 6 to 7)**

All three developers test across devices, resolve bugs, run accessibility checks, and push performance optimisations. Final builds are prepared for deployment. Any documentation that has drifted from what was actually built gets updated to reflect reality.

## 12. Deliverables Checklist

Everything the project needs to produce is listed below. Nothing should be considered done until it has been tested, reviewed, and merged.

**Frontend**
* Public website covering the home, about, and contact pages
* Member registration flow including OTP verification
* Sign-in, forgot password, and reset password flows
* Member dashboard and profile management
* Admin login and the full admin portal
* Member management table with search, filter, sort, and pagination
* Data export to CSV and Excel
* Audit log viewer
* Shared design system and component library
* Fully responsive layout across mobile, tablet, and desktop

**Backend**
* REST API covering all required endpoints
* Authentication service with JWT issuance and validation
* OTP service integrated with the SMS gateway
* Member service handling all CRUD operations
* Admin service with role-based access control
* Notification service for SMS and email delivery
* Export service generating CSV and Excel files
* Audit logging covering all admin actions

**Data**
* Database schema and migrations
* Redis cache configuration
* Backup strategy and schedule

**Infrastructure and Documentation**
* Cloud hosting configuration
* CDN setup
* Environment variable documentation
* API specification
* Deployment guide
* Admin user manual

## 13. Glossary

These terms come up throughout the document. Here is what they mean in plain language.

**API (Application Programming Interface):** A set of rules that lets one piece of software talk to another. When the frontend asks the backend for a list of members, it is making an API call.

**API Gateway:** The single entry point for all frontend requests. Think of it as a receptionist that checks credentials and directs requests to the right department.

**Audit Log:** A permanent record of every significant action taken by an administrator. Who did what, and when.

**CDN (Content Delivery Network):** A network of servers spread across different locations that deliver static files like images and scripts to users from whichever server is closest to them, making pages load faster.

**CORS (Cross-Origin Resource Sharing):** A browser security rule that controls which websites are allowed to make requests to a given server. Without it, any website could try to call your API.

**CSRF (Cross-Site Request Forgery):** A type of attack where a malicious website tricks a logged-in user's browser into making a request to another site on their behalf without them knowing.

**JWT (JSON Web Token):** A compact, tamper-evident token that carries identity information. When a member logs in, they receive a JWT that proves who they are on every subsequent request.

**OTP (One-Time Password):** A short code, usually six digits, sent to a phone via SMS. It can only be used once and expires quickly. Used here to verify that a member actually owns the phone number they registered with.

**RBAC (Role-Based Access Control):** A way of managing permissions based on roles. Instead of assigning permissions to individual users, you assign them to roles, and users get permissions by being given a role.

**Redis:** A fast in-memory data store used for things that need to be read and written very quickly and do not need to live forever, like OTP codes and session references.

**REST (Representational State Transfer):** A common pattern for building web APIs using standard HTTP methods like GET, POST, PUT, and DELETE.

**XSS (Cross-Site Scripting):** An attack where malicious JavaScript is injected into a web page and then executed in other users' browsers, potentially stealing data or taking actions on their behalf.
