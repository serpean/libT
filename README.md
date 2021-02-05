# libT
LibT is a "social cataloging" website that allows individuals to freely search and reviews books, movies, "series" and videogames.

https://www.libib.com/

# Features

It start with books, movies and videogames, the structure is similar.

- Discovery: 
  1. Search books on a simple db or add by themselves.
  1. Users can add books, movies... to their personal shelves, 
  1. rate and review books, 
  1. see what their friends are reading.
  1. Set start and end date (read, played, watched)

- User interaciton: 
  1. Personal page with your public shelves.
  1. follow other user to see the activity.

- Challenge: Set a anual challenge. Each user can select how many books, movies or games read, watch or reed. Other challenge could be see a one concrete serie.

- Persona page:
  1. Edit??

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

# Models

## Books
- Title
- Authors Look format
- Description 
- Publish DAte
- Publisher
- ISBN
- Pages
- Image

## Movies
- Title
- Directors
- Actors
- Description
- Release Date
- EAN?
- Aspect ratio
- Minutes
- Image

## Videogames
- Title
- Platform (1+)
- Description
- Release Year
- Studio
- EAN??
- UPC??
- ESRB?
- Image

# Relation USER/RESOURCE
 ## General
 -Number time read/played/watched (for movies this will be the same day)
  - Start Date
  - End Date
  - Hours (per game)
 - End Date
 - Review
 - Stars
 
## Book
 - Pages readed
## Videogames
- Hours
## Movie
 - ???

## DBs uses
 - Books: ???
 - Movies: ???
 - Videogames: ???
 
# Posibilities
- Chat?
- Post on your profile about thinks.
- Notifications system

# User profile (when you visit someone profile)
- Name
- Profile image
- Details ??
- Activity ??
- Ratings
- Reviews
- Recommend resource
- Compare resource
- Suggest Friend
- Add/Delete friend
- Block
- Favourites
- Public SHELVES
- Current state (what is reading, playing)
- Recent updated (last 10 books, films, videogames updates*)
- Comment to a friend
- Challenge
- More:
  - Common firends
  - Friends
  - People USER is following
  
# Shelves
- Resctirction: 
  1. One resource only can stay on one user default shelve (read, want...)
  1. One resource can be in multiple libraries
  1. Select the type of the shelve
## BookShelves
- All
- Read
- Current Reading
- Want to Read
- More + (by the user)
## MovieShelves
- All
- Watched
- Want to watch
- More + (by the user)
## VideogamesShelves
 - All
- Read
- Current Reading
- Want to Read
- More + (by the user)
