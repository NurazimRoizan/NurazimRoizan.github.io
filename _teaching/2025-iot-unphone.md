---
title: "Internet of Things - UnPhone"
collection: teaching
type: "Group Project"
permalink: /project/2025-iot-unphone
venue: "University of Sheffield, BSc in Computer Science"
date: 2025-01-01
location: "Sheffield, United Kingdom"
---

Developed a custom game controller using a Wi-Fi-enabled ESP32 device, which sends a "jump" command to a game server via HTTP GET requests. The controller features both a gesture-based input using its onboard IMU (accelerometer/gyroscope) and a physical button press, with a custom UI screen to manage the input state.

<div class="image-gallery">
  <div class="gallery-item">
    <img src="/images/MenuUI.jpeg" class="consistent-image" alt="Unphone Main Menu UI">
    <p class="image-description">The main menu UI.</p>
  </div>
  <div class="gallery-item">
    <img src="/images/DinoGameUI.jpeg" class="consistent-image" alt="Unphone DinoGame Controller UI">
    <p class="image-description">The dedicated UI screen for the game controller, with a visual player indicator.</p>
  </div>
</div>


Overview
======
This project was a deep dive into embedded systems, combining hardware and software to create a custom game controller from an Unphone device. The goal was to build an unconventional input device for a simple web-based game, showcasing the Unphone's capabilities for sensor integration, custom UI, and network communication.

The controller provides two distinct ways for a player to "jump": a physical button press, and a more intuitive gesture using the device's onboard accelerometer and gyroscope. When either action is detected, the Unphone sends a command to a game server running on a local PC, bringing the physical and digital worlds together.

Technical Features & Skills
======
Custom Firmware & Embedded C++: The core of the project involved writing C++ firmware for the ESP32-based Unphone. This included configuring peripherals, managing state, and implementing the control logic.

Sensor Integration (IMU): I integrated and configured the device's Inertial Measurement Unit (IMU) to detect a physical "flick-up" gesture. This required setting and tuning sensitivity thresholds to filter out noise and ensure a reliable, responsive trigger.

Wi-Fi Networking: The device was configured to connect to a local network and act as an HTTP client. It sends a simple GET request to a configured server endpoint, demonstrating a fundamental understanding of network communication in an IoT context.

Custom UI Development: I developed a new screen for the Unphone's GFX-based UI framework. This included creating a visual interface for the game controller, complete with a visual indicator and menu integration, showcasing an ability to extend an existing UI library.

The Fun Part: How It Works
======
The magic happens when a player makes a flicking motion with the Unphone. The firmware constantly reads data from the IMU, and when a combination of acceleration and angular velocity thresholds are met, it recognizes the gesture as a "jump." This is a more immersive and physical way to play, moving beyond a simple button press.

A custom menu screen, "DinoGame Controller," was added to the Unphone's interface, with a player number displayed for visual feedback. The flick-to-jump feature is intelligently activated only when this screen is active, preventing accidental triggers. For a more traditional experience, a dedicated physical button on the Unphone can also be used to send the jump command.

The project also includes a small, playful feature for fun: a "TV Remote" function using the device's infrared capabilities to send a power signal.

Video Demonstration
======
A video demonstration of the controller in action can be viewed here:

[Unphone Demo](https://www.youtube.com/watch?v=Qqbvo6nxM9w)

What I Learned
======
This project was a fantastic exercise in integrating multiple systems—hardware, firmware, and networking—to create a unified, interactive experience. It reinforced the importance of careful sensor calibration, state management, and debugging in an embedded environment, particularly when dealing with physical inputs and network dependencies. It's also worth noting that this is just a small glimpse into the Unphone's capabilities; there is a whole lot more fun to be explored with this device.