---
title: "Internet of Things - GeeyBoard"
collection: teaching
type: "Individual Project"
permalink: /project/2025-iot-geeyboard
venue: "C++, C, Arduino, Open Source"
date: 2025-10-26
location: "Hobby"
---

Developed a custom Bluetooth Low Energy (BLE) Human Interface Device (HID) and an integrated Infrared (IR) remote, turning the Unphone device into a highly versatile, single-handed control unit. The primary design goal was maximizing comfort and control from the sofa.

<div class="image-gallery">
<div class="gallery-item">
<img src="/images/KeyboardUI.jpg" class="consistent-image" alt="Unphone BLE Keyboard UI">
<p class="image-description">The custom touch interface showing the key clusters for input.</p>
</div>
</div>


Overview
======
This project was focused on creating a multi-tool controller that eliminates the need for reaching for a keyboard, mouse, or TV remote while deep in a couch session. It shifts the focus from Wi-Fi communication to the much more reliable and power-efficient Bluetooth Low Energy (BLE) standard. The controller masquerades as a standard Bluetooth keyboard, allowing seamless control over a PC, tablet, or smart TV.

The device integrates two key functions: a custom, single-handed keyboard optimized for media controls (like Windows Key and Arrows) and an integrated IR blaster to handle line-of-sight remote functions (like turning the TV on or off).

Technical Features & Skills
======
Embedded C++ & Firmware Development: The entire control logic is written in Embedded C++ for the ESP32. This includes advanced C++ techniques essential for embedded systems, such as:

  * Strict adherence to the One Definition Rule (ODR) for managing the global NimBLEKeyboard object across multiple .cpp and .h files using the extern keyword.

  * Writing bare-metal firmware logic to manage state transitions within the device's main event loop.

  * Low-level resource and memory management in a constrained environment.

BLE HID Emulation (NimBLE): The core challenge involved implementing the Human Interface Device (HID) profile over BLE using the NimBLE stack. This required deep knowledge of the protocol to ensure the Unphone was recognized as a reliable input device (Keyboard) across Windows, Linux (like BunsenLabs), and Android/iOS.

Connection State Management: I implemented logic to manually manage the BLE connection state. This included detecting if the device was connected and, crucially, using a dedicated button to force a disconnect and restart BLE advertising (bleKeyboard.end() followed by bleKeyboard.begin()), solving the common problem of switching between host devices without a hard reset.

Infrared (IR) Protocol Implementation: I integrated the IRremoteESP8266 library to enable infrared transmission, mapping a button press to a specific IR protocol (e.g., NEC, SONY) and command code. This requires careful configuration of the IR LED pin and protocol details.

Custom Key Mapping: I mapped essential, non-character keys—like KEY_LEFT_GUI (Windows/Super Key) and the directional arrow keys (KEY_UP_ARROW, KEY_DOWN_ARROW)—to the custom touch clusters, creating a highly specific control experience.

The Fun Part: How It Works
======
The magic lies in combining the most-used controls into a single, intuitive device. Instead of a full keyboard, the GeeyBoard provides only the essentials for navigation and media control, with keys like the Windows key (for opening menus or search) and directional arrows being primary inputs.

The true "sloth mode" feature is the Force Reconnect button. If I pair the Unphone to my PC and then want to switch to my tablet without getting up, I simply hit the mode-switcher button. The Unphone instantly broadcasts itself for pairing again, eliminating the need to physically interact with the ESP32.

The project also includes a critical, secondary function: a "TV Power Off" button utilizing the IR transmitter. This ensures that even the final act of ending the binge session—turning off the television—can be performed without ever leaving the gravitational pull of the sofa.

What I Learned
======
This project was an excellent lesson in the complexities of the BLE stack, particularly focusing on device reliability and power state management. It reinforced the importance of using the extern keyword for global object definitions and ensuring that the BLE thread has enough time in the main loop() (via a small delay) to prevent the advertising routine from stalling. The integration of two separate wireless technologies (BLE and IR) into one cohesive user interface was a rewarding exercise in embedded system multitasking and state transition logic.