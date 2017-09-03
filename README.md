# Django & Webpack starter template

## Requirements

- Python 3
- Django 1.10
- Node 6 & npm 3
- PostgreSQL 9


## Install

1. Start a new project
    ```
    django-admin startproject --template=https://git.io/v50DW --extension=py,js {{ project_name }}
    ```

2. Install project requirements
    ```
    pip install -r requirements.txt
    npm install
    ```

3. Create a PSQL database
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
