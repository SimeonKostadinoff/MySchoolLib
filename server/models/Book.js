var mongoose = require('mongoose');

var booksSchema = mongoose.Schema({
    title: { type: String, require: '{PATH} is required'},
    author: String,
    genre: [],
    boughtDate: Date,
    isbn: { type: String, unique: true },
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
    }],
    likes:[{
        userID: String,
        userFirstName: String,
        userLastName: String
    }],
    comments:[{
        userID: String,
        userFirstName: String,
        userLastName: String,
        comment: String
    }]

});

var Book = mongoose.model('Book', booksSchema);



module.exports.seedInitialBooks = function() {
   /* Book.find({}).remove({},function(err,msg){
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
        if (collection.length <= 1) {
            Book.create({
                title: 'Glencoe Health, A Guide to Wellness, Student Edition',
                author: 'McGraw-Hill Education',
                publisher: "Wright Group/McGraw-Hill-Secondary",
                publishedDate: 1998,
                summary: 'Everything you need to teach and motivate your students is here--in one comprehensive, skills-based health program. Glencoe Health combines print, audio, and technology resources in an integrated program of health education sure to engage and challenge ev',
                isbn: 0026515628,
                cover:'http://books.google.com/books/content?id=ynoMAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                boughtDate: new Date(),
                log: [],
                status: {
                    returned: true,
                    returnDate: null,
                    requestedBy: [],
                     takenBy:{}
                }});
            Book.create({
                title: 'Design of Machinery',
                author: 'Robert L. Norton',
                publisher: "McGraw-Hill Professional",
                publishedDate: 2003,
                summary: "Robert Norton's Design of Machinery, 3/e continues the tradition of this bestselling book by emphasizing the design aspects of mechanisms and providing numerous industry examples and illustrations for readers. Norton provides a solid conceptual foundation for the kinematics and dynamics of machinery, presented in the context of what a design engineer needs to work with. The new 3/e has revised and expanded chapter problem set - 231 new problems have been added. 88 Project Assignments are also included to give readers an in-depth look at mechanism design and analysis procedures in a realistic format. Coverage of compliant mechanisms and MEMS has been added in Chapter 2; a section entitled Some Useful Mechanisms is now in Chapter 3; treatment of cams in Chapters 8 has been condensed and modernized. Information on transmissions and engine dynamics has been enhanced and expanded as well. Norton's own student-version programs, an extensive group of Working Model simulations (by Sid Wang, North Carolina A&T University), additional Working Model examples, and the MSC Working Model 2-D program itself (demonstration version). A new Book Website includes additional instructor and student resources. Detailed solutions to all chapter problems and project assignments, are available to instructors on the website, under password protection.",
                isbn: 0072864478,
                cover:'http://books.google.com/books/content?id=LLWBbV5_hF0C&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                boughtDate: new Date(),
                log: [],
                status: {
                    returned: true,
                    returnDate: null,
                    requestedBy: [],
                    takenBy:{}
                }});
            Book.create({
                title: 'Labor Economics',
                author: 'George J. Borjas',
                publisher: 'Irwin Professional Pub',
                publishedDate: 2005,
                summary: "George Borjas\u2019 well-received text blends coverage of traditional topics with modern theory and developments into a superb Labor economics book. His integration of theory with facts and coverage of latest research make his book one of the most popular at the middle and upper end of the market.",
                isbn: 39015062435089,
                cover:'http://books.google.com/books/content?id=ljPtAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                boughtDate: new Date(),
                log: [],
                status: {
                    returned: true,
                    returnDate: null,
                    requestedBy: [],
                    takenBy:{}
                }});
            Book.create({
                title: 'Complex Variables and Applications',
                author: 'James Ward Brown,Ruel Vance Churchill',
                publisher: "McGraw-Hill Science Engineering",
                publishedDate: 2004,
                summary: "Contents - Complex Numbers; Analytic Functions; Elementary Functions; Integrals; Series; Residues and Poles; Applications of Residues; Mapping by Elementary Functions; Conformal Mapping; Applications of Conformal Mapping; The Schwarz - Christoffel Transformation; Integral Formulas of the Poisson Type.",
                isbn: 0072872527,
                cover:'http://books.google.com/books/content?id=4vfuAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                boughtDate: new Date(),
                log: [],
                status: {
                    returned: true,
                    returnDate: null,
                    requestedBy: [],
                    takenBy:{}
                }});
            Book.create({
                title: 'Perception',
                author: 'Randolph Blake,Robert Sekuler',
                publisher: "McGraw-Hill Humanities/Social Sciences/Languages",
                publishedDate: 2006,
                summary: "Perception, 5e, by Randolph Blake and Robert Sekuler, helps students appreciate the complexity of perception, while giving them a fresh perspective on their own seeing, hearing, touching, smelling, and tasting. This thoroughly revised Fifth Edition includes updated research on cognitive influences on perception, two additional chapters, and a new, contemporary look.",
                isbn: 004907403,
                cover:'http://books.google.com/books/content?id=jKVFAAAAYAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                boughtDate: new Date(),
                log: [],
                status: {
                    returned: true,
                    returnDate: null,
                    requestedBy: [],
                    takenBy:{}
                }});
            Book.create({
                title: 'Crafting and Executing Strategy',
                author: 'Arthur A. Thompson, Jr.,Alonzo J. Strickland,John E. Gamble',
                publisher: "Irwin Professional Pub",
                publishedDate: 2004,
                summary: "Thompson, Strickland and Gambles\u2019, CRAFTING AND EXECUTING STRATEGY: The Quest for Competitive Advantage, 14e clearly conveys the central thrust of basic courses in business and competitive Strategy. This text presents the most recent research in strategy in a way that students can understand and apply to business cases and problems. This edition includes a streamlined presentation of the chapters and an all new chapter on Strategy, Ethics and Social Responsibility. Known for its cases and teaching notes, CRAFTING AND EXECUTING STRATEGY, 14e includes 37 new or updated cases that will spark student interest and generate lively classroom discussions.",
                isbn: 0072962216,
                cover:'"http://books.google.com/books/content?id=qHJrNAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
                boughtDate: new Date(),
                log: [],
                status: {
                    returned: true,
                    returnDate: null,
                    requestedBy: [],
                    takenBy:{}
                }});

            console.log("Books added");
        }
    });
};