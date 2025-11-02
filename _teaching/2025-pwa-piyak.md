---
title: "Progressive Web Application - PiYak"
collection: teaching
type: "Individual Project"
permalink: /project/2025-pwa-piyak
venue: "HTML, CSS, JavaScript, Open-Source"
date: 2025-11-2
location: "Hobby"
redirect_from:
  - /piyak
---

A Progressive Web App (PWA) for tracking your period cycle and poop counter. I built this to avoid the constant ads and $2 subscription fees of other mobile trackers. Data is saved simply and freely using the Google Forms API.
<a href="https://nurazimroizan.github.io/PiYak">Live Website</a>

<div class="image-gallery">
<div class="gallery-item">
<img src="/images/KeyboardUI.jpg" class="consistent-image" alt="piyakpage">
<p class="image-description">The webpage calendar.</p>
</div>
</div>

Overview
======
This project was focused on creating a Progressive Web App (PWA) to provide a clean, secure, and ad-free alternative to bloated commercial mobile trackers for essential health metrics: menstrual cycles and bowel movements (poop counter). The motivation was to build a zero-cost, accessible platform, eliminating the common requirement for users to pay subscriptions or view excessive advertising just to log simple bodily functions.

The application leverages the simplicity and ubiquity of Google Forms as a dedicated API endpoint for all data ingress, storing user data securely in a connected Google Sheet. A key feature is the ability to securely fetch and display anonymized tracking data from friends, fostering community engagement and comparative health insights without compromising individual privacy.

Technical Features & Skills
======
Progressive Web App (PWA) Implementation: The application was engineered to be installable and offline-capable, providing a native-app-like experience across desktop and mobile platforms. This involved:

  * Service Worker Development: Implementing a Service Worker to manage caching strategies (cache-first) for the core application shell and assets, ensuring offline access and rapid load times.

  * Manifest Configuration: Creating the manifest.json file to define the PWA's appearance (icons, splash screen, display mode) for a seamless installation experience.

Zero-Cost Backend Integration (Google Forms API): The core challenge was implementing a reliable, serverless data pipeline without a traditional API endpoint or database, utilizing only free Google services.

  * Direct Form Submission: Writing and managing a JavaScript fetch request to directly submit data to the Google Form's pre-filled URL endpoint. This required careful serialization of form fields to match the specific name attributes expected by the Google Form.
  * CORS Management: Ensuring the client-side JavaScript could successfully POST data to the external Google Form domain, a common challenge when using this method as a pseudo-API.

Front-End Development & UX:

  * Responsive Design: Using pure HTML/CSS and Vanilla JavaScript to create a mobile-first, touch-friendly interface optimized for quick daily logging.
  * Client-Side Data Management: Implementing simple data structures in JavaScript to manage and display cycle dates and log entries before submission.

The Fun Part: How It Works
======
The genius of this project is its stealthy use of Google's infrastructure. Every time a user logs a period start or a bowel movement, the app isn't talking to a database server—it's silently submitting a hidden Google Form. This allows for immediate data logging without any server maintenance, subscription costs, or the need for user accounts beyond their browser's local storage for settings.

The project solved two major personal pain points: first, providing a clean, ad-free experience, proving that a useful tracker doesn't need to be a monetization engine. Second, it acts as a reliable, ever-present tool that's quick enough to use even in a rush, helping my forgetful girlfriend and others consistently track cycle dates without the mental overhead of opening a complex app.

The PWA aspect means the app is always a tap away on the home screen, making the daily logging habit stick.

What I Learned
======
This project was an excellent demonstration of "API-less" data architecture and leveraging common web services for simple data storage. It reinforced the importance of PWA Service Worker lifecycle management for guaranteed offline functionality. Most importantly, it provided hands-on experience in client-side data sanitation and anonymization logic to implement a privacy-focused social feature, ensuring that while the data is communal, the individual identity and specific entries remain protected.