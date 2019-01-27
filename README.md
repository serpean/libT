# libT
LibT is a "social cataloging" website that allows individuals to freely search and reviews books, movies, "series" and videogames.

# Features

It start with books, movies and videogames, the structure is similar.

- Discovery: Users can add books, movies... to their personal bookshelves, rate and review books, see what their friends are reading.
Search books on a simple db or add by themselves.
Set start and end date (read, played, watched)

- User interaciton: follow other user to see the activity.

- Challenge: Set a anual challenge. Each user can select how many books, movies or games read, watch or reed. Other challenge could be see a one concrete serie.

# Technology
- Mongo
- Express
- Node
- React / Angular
- Other language for backend, microservices admit this.

# Arquitecture

Microservices

This app will store the reviews and the users.

Each microservice will have the own database (this admit to grow easily if you want to add other topic)

- Auth
- Follow system
- Books
- Movies
- Videogames
