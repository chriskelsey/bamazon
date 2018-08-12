# Bamazon Tiny Store

## Overview

This is a small server side app using MySQL and Node JS that simulates an online store inventory monitoring system. The end user comes and selects items from the store and receives a total price. Then the inventory is updated in real time in the database.

## Process

1. User accessing via the node app command line. The user is given a table of items for purchase and a prompt to choose:

![Initial User Interface](/bamazon/screenshots/screenshot-1-interface.jpg?raw=true)

* The table is populated via a MySQL database on the backend:

![MySQL Database table](/bamazon/screenshots/screenshot-2-database.jpg?raw=true)

2. The user chooses an item and amount of stock, if there is enough stock, they are given a total, if not, they are made aware that there isn't enough and asked if they want to keep shopping:

![User Prompts](/bamazon/screenshots/screenshot-3-interface.jpg?raw=true)

* On the backend the quantity is updated:

Before:

![Sample Data Before](/bamazon/screenshots/screenshot-4-database-before.jpg?raw=true)

After:
![Sample Data After](/bamazon/screenshots/screenshot-5-database-after.jpg?raw=true)

3. Finally the user is given the option to restart the process or exit the app.
