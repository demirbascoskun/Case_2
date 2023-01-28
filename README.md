# How to start the whole project



## With Docker

if docker installed in your computer, all you need to do is :

### `docker-compose up`

After containers are ready
you can access backend at `http://localhost:2501`

you can access frontend at `http://localhost:2500`

## Without Docker Running Backend

cd Backend

virtualenv env

pip install -r requirements.txt

python manage.py runserver 2501

## Without Docker Running Frontend

cd Frontend/case2

npm install

npm start



