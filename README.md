# Moodle: smart mirror for mental health check in

This is the repository for the project of Moodle. Moodle is a smart interactive mirror implemented with raspberry Pi. 
This project was implemented under the course of Technologies in Human-Computer Interaction, on the Msc of Human-Computer Interaction in Newcastle University.
The development team was Loukia, Nupaan, Shakthi, Juveria

# Description 
Moodle is a smart mirror for the workspace helping employees manage their mental health. The employees can interact with the mirror through the dashboard select how their feeling from the already defined emotions and then shuffle through prompts depending on their mood. The prompts vary from motivational codes, video exercises and actions that the employee can take for example the mirror will encourage the employee to take a coffee break if they are feeling sad
It was implemented using HTML/CSS/JavaScript and Node.js.

# Hardware
In order to implement this code, the following hardware is needed
- Raspberry Pi
- Monitor, to connect the Pi
- 3 buttons
- 1 RFID card scanner

# Use the software
First, you need to connect the raspberry pi to the defined pins as shown in the server.mjs file.
To run this project: *nodemon server.mjs*

# Architecture
1. When the mirror is idle then it shows the index.html. The user scans their card, the system detects the scan through a websocket in the server.mjs, and the display is now the selection.html file. 
2. Using the buttons on the dashboard the user selects their emotion that is detected through javascript and when the select button is pressed then the display shows the prompts of the selected emotion. 
3. If the user is in a prompt page and presses the select button again, then the system shuffles through the prompts. 
4. Once the next button is pressed then the display shows the exit.html.
5. If the user presses selects the yes option on the "Is there anything that i can help you with?" question then the page changes back to the selection.html page, otherwise it goes back to the index.html page until a new card is scanned.
