var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title: String,
    author: String,
    boughtDate: Date,
    tags: [String],
    log:[{
        takenBy: String,
        takenDate: Date,
        returnDate: Date
    }],
    status: {
        requestedBy: [String],
        takenBy: String,
        takenDate: Date,
        returned: Boolean,
        returnDate: Date
    }
});

var Book = mongoose.model('Book', booksSchema);



/*
module.exports.addNewBook = function(title,author,boughtDate,tags){
    Book.find({}).exec(function(err,collection){
        if(err){
            console.log('Cannot find books: ' + err);
            return;
        }
        else{
            Book.create({title: title,author: author, boughtDate:boughtDate,tags: tags});
        }
    })
}*/
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
        if (collection.length <= 2) {
            Book.create({title: 'Клетниците' ,author: 'Виктор Юго', boughtDate:new Date(), log:[{}], status:{requestedBy:['Stamat', 'Gosho'],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Дон Кихот' ,author: 'Мигел де Сервантес', boughtDate:new Date(), log:[{}], status:{requestedBy:[''],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Преспанските камбани' ,author: 'Димитър Талев', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Железният светилник' ,author: 'Димитър Талев', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Пипи дългото чорапче' ,author: 'Астрид Линдгрен', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'Petkan',takenDate:new Date(),returned:false, returnDate:''}});
            Book.create({title: 'Ян Бибиян' ,author: 'Елин Пелин', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Шифарът на Леонардо' ,author: 'Дан Браун', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Шестото клеймо' ,author: 'Дан Браун', boughtDate:new Date(), log:[{}],status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Цифрова крепост' ,author: 'Дан Браун', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Хамлет' ,author: 'Уилям Шекспир', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Метеоритът' ,author: 'Дан Браун', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Живей бързо 1234' ,author: 'Надя Чолакова', boughtDate:new Date(), log:[{}], status:{requestedBy:[],takenBy:'',takenDate:'',returned:true, returnDate:''}});
            Book.create({title: 'Христо Смирненски Поезия' ,author: 'Христо Смирненски', boughtDate:new Date(), log:[{}], status:{requestedBy:['Stamat', 'Gosho'],takenBy:'',takenDate:'',returned:true, returnDate:''}});

            console.log("Books added");
        }
    });
};