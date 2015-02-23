var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title: { type: String, require: '{PATH} is required'},
    author: String,
    boughtDate: Date,
    ISBN: { type: String, require: '{PATH} is required', unique: true },
    summary:String,
    publisher: String,
    publishedDate: Number,
    cover: String,
    status: {
        requestedBy: [{
            userID: String,
            userFirstName: String,
            userLastName: String
        }],
        takenBy:{
            userID: String,
            userFirstName: String,
            userLastName: String,
            takenDate: Date,
            dateToBeReturned: Date
        } ,
        returned: Boolean,
        returnDate: Date
    },
    log:[{
        takenBy: {
            userID: String,
            userFirstName: String,
            userLastName: String
        },
        takenDate: Date,
        returnDate: Date
    }]


});

var Book = mongoose.model('Book', booksSchema);



module.exports.seedInitialBooks = function() {
    /*Book.find({}).remove({},function(err,msg){
        if(err){
            console.log("Couldnt remove the books.")
        }
        console.log("Books removed");
    });*/
    Book.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find books: ' + err);
            return;
        }
        if (collection.length == 0) {
            Book.create({title: 'Клетниците' ,author: 'Виктор Юго', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Дон Кихот' ,author: 'Мигел де Сервантес', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{}, returned:true, returnDate:''}});
            Book.create({title: 'Преспанските камбани' ,author: 'Димитър Талев', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Железният светилник' ,author: 'Димитър Талев', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Пипи дългото чорапче' ,author: 'Астрид Линдгрен', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:false, returnDate:''}});
            Book.create({title: 'Ян Бибиян' ,author: 'Елин Пелин', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{}, returned:true, returnDate:''}});
            Book.create({title: 'Шифърът на Леонардо' ,author: 'Дан Браун', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Шестото клеймо' ,author: 'Дан Браун', boughtDate:new Date(), log:[],status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Цифрова крепост' ,author: 'Дан Браун', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Хамлет' ,author: 'Уилям Шекспир', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Метеоритът' ,author: 'Дан Браун', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Живей бързо 1234' ,author: 'Надя Чолакова', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});
            Book.create({title: 'Христо Смирненски Поезия' ,author: 'Христо Смирненски', boughtDate:new Date(), log:[], status:{requestedBy:[],takenBy:{},returned:true, returnDate:''}});

            console.log("Books added");
        }
    });
};