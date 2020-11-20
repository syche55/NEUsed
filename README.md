# project-NEUsed
**This is a web application that supports users to sell and buy items. Users can post their items for sale, edit and delete their post and explore things by different categories.**

- Development Process: Agile Development(Scrum).
- Committing way: feature branch workflow by committing branches and submit pull requests to have code reviewed and committed to the master branch

### Team Repository & Members
- [Team Repo](https://github.ccs.neu.edu/orgs/2020FACS5500SV/teams/project-neused-team)
- [Siyu Chen](https://github.ccs.neu.edu/siyuchen2020)
- [Yijing Liu](https://github.ccs.neu.edu/yijingliu)
- [Yixuan Yu](https://github.ccs.neu.edu/nancyyu)
- [Jing Shen](https://github.ccs.neu.edu/jshen1110)


# UI Design & Teach Stack

### UI Design
Navbar: using [React- Bootstrap API](https://react-bootstrap.github.io/)
- About: a page that explains our mission and functionalities of the site. Including some using tips.[]
- Discover: a page for exploring all items for sales.[]
- Add a post (shows as + icon)
- [x] Authenticated user may enter item description, category and item image url when adding a new post
- User
- [x] Login: use [Google Sign-In API](https://developers.google.com/identity) to sign user in
- [x] log out 

### Side bar Design
- Category: a list of categories to guide users exploring items (eg: furnitures, electronics, books etc.)
- [x] using [React Pro Sidebar API](https://www.npmjs.com/package/react-pro-sidebar)

### Backend Desgin
- using [MongoDB](https://www.mongodb.com/)
- Model: 
--Post{title; image url; content; author; status; date; category]
-- User{} Account info from Google Sign in API
Post can be edit, delete, add. User can sign in and out.

# Project Wiki & docs

[Project Wiki](https://github.ccs.neu.edu/2020FACS5500SV/project-NEUsed/wiki)

[Project public webpage](https://pages.github.ccs.neu.edu/2020FACS5500SV/project-NEUsed/)

[Project board](https://github.ccs.neu.edu/2020FACS5500SV/project-NEUsed/projects)

