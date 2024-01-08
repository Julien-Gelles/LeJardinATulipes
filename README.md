<h1 align="center">
LE JARDIN A TULIPES
</h1>

<p align="center">
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></a>
<a href="https://expressjs.com"><img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"></a>
<a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white"></a>
</p>

<p align="center">
<a href="#overview">Overview</a> • <a href="#how-to-use">How To Use</a> • <a href="#manage-your-tulip">Manage your tulip</a> • <a href="#other-features">Other Features</a> • <a href="#author">Author</a><br>
</p>

<p align="center">
<img src="https://cdn.glitch.global/8c20220c-af71-4768-a86a-e5f46714c3b4/tulipe.png?v=1677883683788">
</p>

---

## Overview

This project is as a real-time community canvas garden, enabling users to engage with virtual tulips by adding new ones, watering them, and accessing details about their respective tulips.<br>
It uses Socket.IO to manage real-time communication between the server and clients and MongoDB to store tulips datas.

Freely hosted on **[Glitch](https://glitch.com/)** and available at the web address: **https://lejardinatulipes.glitch.me**

<img src="img/garden.jpg">

## How To Use

### Express.js

Make sure you have **express.js** installed. If not you can install it with :

```bash
$ npm install express
```

### MongoDB

If you wish to execute the code independently, you'll need to establish your own MongoDB with the specified configuration:

- Create a database named **`garden`**.
- Set up a collection named **`tulips`**.

Finally, make sure to set up the MongoDB connection string in a **.env** file :

```bash
DB_STRING = 'mongodb+srv://username:password@cluster0.nvr1sil.mongodb.net/?retryWrites=true&w=majority' #Write here your own MongoDB URI connection string
```

Alternatively, feel free to modify the code below in `server.js` , as you prefer :

<img src="img/mongoSetup.jpg">

### Run

Then you can start the app with :

```bash
$ npm start
```

## Manage your tulip

### Water

It is only possible to plant one tulip per device.<br>
Tulips have a default lifespan of 24 hours.
Users can water their tulip every hour to add 6 hours to its lifespan.

### Visual upgrade

As a tulip exists over time, its appearance will evolve. Currently, this concept is not extensively developed but serves as a straightforward avenue for future improvement.

<img src="img/tulipes.jpg">

### Tulips Informations

Real-time information about one's own tulip or another tulip can be displayed by clicking on it.

<img src="img/stats.jpg">

## Other Features

- Drag-and-drop functionality for moving tulips on the screen.
- Simultaneous and periodically update tulips informations.
- Panning functionality for the garden.

## Author

- [Gelles Julien](https://www.github.com/julien-gelles)

