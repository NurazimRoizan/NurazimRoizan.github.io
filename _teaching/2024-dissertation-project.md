---
title: "Dissertation Project: Graph Theory Visualization Tool"
collection: teaching
type: "Individual Project"
permalink: /project/2024-dissertation-project
venue: "University of Sheffield, BSc in Computer Science"
date: 2024-01-01
location: "Sheffield, United Kingdom"
---

This project develops an interactive interface to visualize the bijective k-Pebble game and the k-Weisfeiler- Leman algorithm, enabling users to explore and understand graph isomorphism – a fundamental problem in computer science with applications in areas such as network analysis and pattern recognition.

<img src="/images/dissertation-menu.png">

Project Overview
======
My dissertation project addressed the significant learning challenges presented by advanced graph theory concepts focusing on graph isomorphism. I designed and implemented an interactive desktop application aimed at making these complex topics more accessible and tangible to learners.

The primary objective was to create a visualization tool that could clearly demonstrate the 1-dimensional Weisfeiler-Leman (1-WL) algorithm and simulate the k-Pebble Game. A key focus was to visually explain the theoretical link between these two concepts, showing how the stable colouring from the 1-WL algorithm informs a winning strategy for the "Duplicator" in the 2-Pebble Game.

Key Features & Technologies
======
The application was built as a standalone desktop tool, utilizing Java Swing for the graphical user interface and the GraphStream library for dynamic graph rendering. This choice of technology allowed for a robust, interactive, and functional tool.

The tool provides the following core features:

* Interactive 1-WL Algorithm: The application allows users to generate or load a graph and then execute the 1-WL (Colour Refinement) algorithm step-by-step. It provides animated node colouring and allows for navigation through each refinement stage to better understand the process.

* k-Pebble Game Simulation: Users can engage in an interactive simulation of the k-Pebble Game. The application supports configurable parameters for the number of pebbles (k) and game rounds (n), making it a flexible learning environment.

* Integrated Visualization: Crucially, a dedicated mode within the tool explicitly shows how the stable colouring produced by the 1-WL algorithm guides the Duplicator's strategic moves in the 2-Pebble Game, making a complex theoretical connection intuitive.

Gallery
======
<img src="/images/dissertation-cr.png">

<img src="/images/dissertation-pebble.png">

What I Learned
======
This project was a deep dive into both software design and pedagogical principles. It reinforced my skills in object-oriented programming with Java and my ability to build a complex application from conception to evaluation of graph theory. Furthermore, it demonstrated the potential of interactive visualization to demystify abstract algorithms and make them more tangible. The positive feedback from manual testing highlighted the tool's value as a pedagogical aid, confirming that a well-designed visualization can significantly improve comprehension of advanced academic topics.