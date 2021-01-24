const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();

const distDir = "/dist/";
const port = 3000;

function generatePassword() {
    return Math.random().toString(36).slice(-8);
}

// Я нагло спиздил это со Stackoverflow. Мне нихуя не стыдно.
function generateLogin(fullName) {
    let cyrillicToEnglish = {"Ё":"YO","Й":"I","Ц":"TS","У":"U","К":"K","Е":"E","Н":"N","Г":"G","Ш":"SH","Щ":"SCH","З":"Z","Х":"H","Ъ":"'","ё":"yo","й":"i","ц":"ts","у":"u","к":"k","е":"e","н":"n","г":"g","ш":"sh","щ":"sch","з":"z","х":"h","ъ":"'","Ф":"F","Ы":"I","В":"V","А":"a","П":"P","Р":"R","О":"O","Л":"L","Д":"D","Ж":"ZH","Э":"E","ф":"f","ы":"i","в":"v","а":"a","п":"p","р":"r","о":"o","л":"l","д":"d","ж":"zh","э":"e","Я":"Ya","Ч":"CH","С":"S","М":"M","И":"I","Т":"T","Ь":"'","Б":"B","Ю":"YU","я":"ya","ч":"ch","с":"s","м":"m","и":"i","т":"t","ь":"'","б":"b","ю":"yu"};


    // Блять, мне настолько впадлу просто все оптимизировать - мне кажется меня за эту хуйню ждет где то 4ый круг ада.
    // Вообще - нахуй я комментарии эти пишу? Вряд ли кто-то кроме меня это увидит.
    let login; 
    do {
        login = fullName.split('').map(function (char) { 
            return cyrillicToEnglish[char] || char; 
        }).join("").toLowerCase() + Math.random().toString(10).slice(-4);
    } while (users[login]);

    login = login.replace(/\s/g, '-');
    return login;
}

class Theatre {
    constructor(fullName, password, city) {
        this.fullName = fullName;
        this.password = password;
        this.city = city;

        this.isTheatre = true;

        this.avatar = "https://via.placeholder.com/256";
    }
}

class User {
    constructor(fullName, password, dateOfBirth, city) {
        this.fullName = fullName;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.city = city;

        this.tickets = [];
        this.balance = 500;

        this.isTheatre = false;

        this.avatar = "https://via.placeholder.com/256";
    } 

    hasTicket(id) {
        return this.tickets.includes(id);
    }
}
class Performance {
    constructor(name, theatre, description, preview, gallery, price) {
        this.name = name;
        this.theatre = theatre;
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
class Recording {
    constructor(name, theatre, description, preview, gallery, price) {
        this.name = name;
        this.theatre = theatre;
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
    "petrov2490": new User("Петров Артем", "123123", new Date(2004, 5, 12)),
    "kamerniy-teatr-vrn": new Theatre("Воронежский Камерный Театр", "1234", "Воронеж")
};


// Я временно беру пикчи хуй пойми откуда - очевидно нужен свой сервер.
performances = {
    /*"carmen": 
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
                        "http://topmira.com/images/9/Opera/Дон Жуан  Don Giovanni  (Музыкальный театр Станиславского).jpg")*/
};
recordings = {
    "don-giovanni": 
        new Recording("Дон Жуан", 
                        users["kamerniy-teatr-vrn"],
                        "Опера Амадея Моцарта на итальянском языке на либретто Лоренцо да Понте по пьесе Антонио де Саморы. Премьера состоялась 29 октября 1787 года в Сословном театре в Праге.", 
                        "http://topmira.com/images/9/Opera/Дон Жуан  Don Giovanni  (Музыкальный театр Станиславского).jpg",
                        [
                            "https://soundtimes.ru/images/operi/42.jpg",
                            "https://www.spbopera.ru/media/common/repertoire/big_1569879109.jpg"
                        ]),
    "carmen": 
        new Recording("Кармен", 
                        users["kamerniy-teatr-vrn"],
                        "Опера французского композитора Жоржа Бизе, премьера которой состоялась 3 марта 1875 года в парижской \"Опера-Комик\". Либреттисты оперы — Анри Мельяк и Людовик Галеви, сюжет создан по мотивам одноимённой новеллы Проспера Мериме.", 
                        "http://topmira.com/images/9/Opera/Кармен  Carmen (Большой театр).jpg",
                        [ 
                            "https://vivareit.ru/wp-content/uploads/2019/08/karmen22.jpg", 
                            "https://afisha.yuga.ru/media/fb/4d/karmen6__cn7pss9.jpg"
                        ]),
    "bohema": 
        new Recording("Богема", 
                        users["kamerniy-teatr-vrn"],
                        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis vel minima quo, possimus quam, molestiae quaerat aut odio animi, reiciendis earum error consequatur libero. Hic, dolore. Esse dolores iste ducimus.", 
                        "http://topmira.com/images/9/Opera/Богема  La Boheme (Музыкальный театр Станиславского).jpg"),
};


// Я рот ебал этого EJS, ебучие nodejsеры нихуя нормального движка нет для рендера простецкого HTML.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, distDir, "views/"))

app.use(express.static(path.join(__dirname, distDir, "static/")));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.redirect("/performances")
});
app.get("/performances", (req, res) => {
    let login = req.session.login;
    let user = users[login];

    res.render("performances.ejs", {
        performances: performances,
        user: user
    });
});
app.get("/recordings", (req, res) => {
    let login = req.session.login;
    let user = users[login];

    res.render("recordings.ejs", {
        recordings: recordings,
        user: user
    });
});
app.get("/profile", (req, res) => {
    let login = req.session.login;
    let user = users[login];

    if (!user) {
        res.status(401);
        return;
    }

    res.render("profile.ejs", {
        user: user
    });
});
app.get("/theatre", (req, res) => {
    let login = req.session.login;
    let user = users[login];

    if (!user) {
        res.status(401);
        return;
    }
    if (!user.isTheatre) {
        res.status(403);
        return;
    }

    res.render("theatre.ejs", {
        user: user
    });
});
app.get("/watch-performance/:id", (req, res) => {
    let login = req.session.login;
    let user = users[login];

    let id = req.params.id;
    let performance = performances[id];

    res.render("watch-performance.ejs", {
        id: id,
        user: user,
        performance: performance
    });
});
app.get("/watch-recording/:id", (req, res) => {
    let login = req.session.login;
    let user = users[login];

    let id = req.params.id;
    let recording = recordings[id];

    if (!user) {
        res.status(401);
        return;
    }


    res.render("watch-recording.ejs", {
        id: id,
        user: user,
        recording: recording
    });
});
app.get("/create-user", (req, res) => {
    let login = req.session.login;
    let user = users[login];

    if (!user.isTheatre) {
        res.status(403);
        return;
    }

    res.render("create-user.ejs", {
        user: user
    })
});
app.post("/user-ticket", (req, res) => {
    let fullName = req.body.login;
    let login = generateLogin(req.body.fullName);
    let password = generatePassword();
    //let date = req.body.dateOfBirth;

    let user = new User(fullName, password, new Date());
    users[login] = user;

    res.render("user-ticket.ejs", {
        login: login,
        user: user
    })
});

app.post("/login", (req, res) => {
    let login = req.body.login;
    let password = req.body.password;
    if (users[login] && users[login].password == password) {
        req.session.login = login;
    }

    res.redirect("/");
});
app.get("/buy/:id", (req, res) => {
    let id = req.params.id;
    let performance = performances[id];
    let user = users[req.session.login];

    if(user.balance >= performance.price) {
        user.balance -= performance.price;
        user.tickets.push(id);
        res.redirect("/watch/" + id);
    } else {

    }   
});

app.listen(port, () => {
    console.log("running app on", port)
});