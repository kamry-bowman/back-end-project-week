# Lambda Notes Back End

The Lambda Notes web applciation was built out as part of my full stack web development application at Lambda School. This was the server that supports the front end, which can be found [here](https://github.com/kamry-bowman/front-end-project-week). The server was built using Node and Express, and used Postgresql in combination with the Knex library.

## Deployed Site

The site is currently viewable [here](https://kam-lambda-notes.netlify.com/). You can log in as "user1" with password "1234" to try out a demo account, or create your own account!

## Features

We were instructed to create a web application with the ability to handle all CRUD features for notes, and match them up to a backend we also designed. As long as we achieved this, we were encouraged to implement more advanced features as we found fit. Features that I added were:
- A tagging interace for notes
- Searching by note text and tags
- Support for CSV export of notes
- Drag and drop for ordering and rearranging notes
- Drag and drop for deletion of tags
- Persistence of note ordering in normalized database using doubly linked list data model
- Authentication flow using Passportjs with both local and oauth strategies

## Technologies Used
The front end made use of:
- ReactJS
- Redux
- Styled Components
- React DnD Drag and Drop

The back end made use of:
- Node/Express
- Postgresql
- Knex
- PassportJS
