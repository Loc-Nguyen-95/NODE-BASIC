// const http = require('http');

// const routes = require('./routes');

// const server = http.createServer(
//     routes.handler
// )

// server.listen(3001); 

const User = require('./models/user');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use( express.static(path.join(__dirname, 'public')) )

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(shopRoutes);
app.use('/admin', adminRoutes);

mongoose
.connect(
    'mongodb+srv://Loc_nguyen:mDEMfSQT_Dr5est@cluster0.xrlivxz.mongodb.net/shop2?retryWrites=true&w=majority'
)
.then(result => {
    console.log('Connected !')
    User.findOne()
    .then( user => {
        if(!user){
            const user = new User({
                name: 'Demo',
                email: 'demo@test.com',
                cart: {
                    item: []
                }
            });
            user.save();
        }
    })
    app.listen(3001);
})
.catch(err => console.log(err))
