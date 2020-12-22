const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

const distDir = "/dist/";
const port = 3000;

class User {
    constructor(fullName, password, dateOfBirth) {
        this.fullName = fullName;
        this.password = password;
        this.dateOfBirth = dateOfBirth;

        this.tickets = [];
        this.balance = 500;

        this.avatar = "https://via.placeholder.com/256";
    } 

    hasTicket(id) {
        return this.tickets.includes(id);
    }
}
class Performance {
    constructor(name, description, preview, gallery, price) {
        this.name = name;
        this.description = description;
        this.preview = preview;

        if(gallery === undefined)
            this.gallery = [ preview ];
        else
            this.gallery = [ preview ].concat(gallery); 

        if(price === undefined) 
            this.price = 300;
        else
            this.price = price;
    }


}

users = {
    "belyanin3094": new User("Белянин Георгий", "123456", new Date(2004, 5, 10)),
    "petrov2490": new User("Петров Артем", "123123", new Date(2004, 5, 12))
};


// Я временно беру пикчи хуй пойми откуда - очевидно нужен свой сервер.
performances = {
    "carmen": 
        new Performance("Кармен", 
                        "Опера французского композитора Жоржа Бизе, премьера которой состоялась 3 марта 1875 года в парижской \"Опера-Комик\". Либреттисты оперы — Анри Мельяк и Людовик Галеви, сюжет создан по мотивам одноимённой новеллы Проспера Мериме.", 
                        "http://topmira.com/images/9/Opera/Кармен  Carmen (Большой театр).jpg",
                        [ 
                            "https://vivareit.ru/wp-content/uploads/2019/08/karmen22.jpg", 
                            "https://afisha.yuga.ru/media/fb/4d/karmen6__cn7pss9.jpg"
                        ]),
    "bohema": 
        new Performance("Богема", 
                        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis vel minima quo, possimus quam, molestiae quaerat aut odio animi, reiciendis earum error consequatur libero. Hic, dolore. Esse dolores iste ducimus.", 
                        "http://topmira.com/images/9/Opera/Богема  La Boheme (Музыкальный театр Станиславского).jpg"),
    "don-giovanni": 
        new Performance("Дон Жуан", 
                        "Опера Амадея Моцарта на итальянском языке на либретто Лоренцо да Понте по пьесе Антонио де Саморы. Премьера состоялась 29 октября 1787 года в Сословном театре в Праге.", 
                        "http://topmira.com/images/9/Opera/Дон Жуан  Don Giovanni  (Музыкальный театр Станиславского).jpg")
};
recordings = [
    
];

// Я рот ебал этого EJS, ебучие nodejsеры нихуя нормального движка нет для рендера простецкого HTML.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, distDir, "views/"))

app.use(express.static(path.join(__dirname, distDir, "static/")))

app.get("/", (req, res) => {
    res.redirect("/performances")
});
app.get("/performances", (req, res) => {
    res.render("performances.ejs", {
        performances: performances,
        user: users["belyanin3094"],
        logged: true
    });
});
app.get("/recordings", (req, res) => {
    res.render("recordings.ejs", {
        recordings: recordings,
        user: users["belyanin3094"],
        logged: true
    });
});
app.get("/profile", (req, res) => {
    res.render("profile.ejs", {
        user: users["belyanin3094"],
        logged: true
    });
});
app.get("/watch/:id", (req, res) => {
    let id = req.params.id;
    let performance = performances[id];

    res.render("watch.ejs", {
        id: id,
        user: users["belyanin3094"],
        performance: performance,
        logged: true
    });
});

app.post("/login", (req, res) => {
    let name = req.post.name;
    let password = req.post.password;

    res.redirect("/");
});
app.get("/buy/:id", (req, res) => {
    let id = req.params.id;
    let performance = performances[id];
    let user = users["belyanin3094"];

    if(user.balance >= performance.price) {
        user.balance -= performance.price;
        user.tickets.push(id);
        res.redirect("/watch/" + id);
    } else {

    }   
});

app.listen(port, () => {

});