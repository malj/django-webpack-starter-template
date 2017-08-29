# Django & Webpack starter template

## Requirements

- Python 3
- Django 1.10
- Node 6 & npm 3
- PostgreSQL 9.5


## Install

1. Start new project
    ```
    django-admin startproject --template=https://github.com/malj/django-webpack-starter-template/archive/master.zip --extension=py,js {{ project_name }}
    ```

2. Install project requirements
    ```
    pip install -r requirements.txt
    npm install
    ```

3. Create PSQL database
    ```
    psql
    > CREATE DATABASE {{ project_name }} OWNER {{ user_name }};
    ```

4. Apply migrations & create superuser
    ```
    python manage.py (-p | -d) migrate
    python manage.py (-p | -d) createsuperuser
    ```

## Environment

Using `manage.py` script requires an environment flag:

- `-d/--development`
- `-p/--production`

## Usage

Python dev server

```
python manage.py (-p | -d) runserver
```

Webpack dev server

```
npm start
```

Webpack build

```
npm run build
```
