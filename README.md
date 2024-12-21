
# BlogProject (Programming Hero Assignment 3)

### Project Api Link

Vecel-link : https://blogproject3.vercel.app/

## Project Installation

Download the project.

```bash
npm install
```
```bash
setup the .env 

NODE_ENV = development
PORT = 5000
DATABSE_URL = mongodb url

```
---

## Description

In this project you can login and register as user or admin. User can post blog, get blog, update, and delete blog. Admin can also post blog and update and can blog other users and aslo can delete any blog. You can search blog by filter title sort .

## Features

- Post data
- Get data
- Update data
- Delete data
- Search data
- Filter data
- Sort data
- Login and Register

## Api Routes

### For the blog post and get data

```bash
/api/blogs
```


### Get a Specific Blog , update and delete

```bash
/api/blogs/:id
```

### For the Login

```bash
/api/auth/login
```

### For the Register
```bash
/api/auth/register
```

### For the Admin Block User

```bash
/api/admin/users/:userId/block
```

### For the Admin Delete Blog
```bash
/api/admin/blogs/:id
```

---