# SDI-CRUD
This is a full stack CRUD web application utilizing Javascript/React/Express/Knex/PostgresSQL

start off docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

then navigate into frontend and run 'npm i', followed by navigating into the backend and running 'npm i'

while in the backend, run 'npm start'
navigate to the frontend and run 'npm start'

Admin accounts are
1.
  Username: Admin@admin.com
  Password: admin
2.
  Username: manage@admin.com
  Password: arnie_palmie

The theme of my application was an online crystal retailer.
The home page gives a brief description of the different types of crystals in inventory, and a button will direct you to each of the different varieties.

The header consists of several buttons.

the first is the image of a green pixel crystal. that will navigate you back to the home page.

The cog wheel is supposed to take you to the admin page, if you are logged in and have the appropriate cookie.
From here you encounter tabs. The first tab shows the full inventory. You can add an item, edit, or delete as appropriate.
The second tab shows admins or inventory managers. The icons do not work yet (stretch goal), but you can add additional people.

The shopping cart, was a stretch goal to implement, but clicking it adds to a counter that increases until 99.
The fingerprint icon/button is how you log in.