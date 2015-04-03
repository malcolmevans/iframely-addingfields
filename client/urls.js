Urls = new Mongo.Collection("urls");

Tasks = new Mongo.Collection("tasks");

var urlRe = /^https?:\/\/[^ \/,"]+\/[^ ,"]+$/i;

//

Template.urls.helpers({
    newitems: function () {
        return Tasks.find({}, {sort: {
                created_at: -1
            }
        });
    }
});

Template.urls.events({
    "submit .embedVideoForm": function (e) {
        //if (e.which === 13) {
            var value = String(e.target.embedvideo.value || "");
            //if (value && value.match(urlRe)) {
            //e.target.embedvideo.value = '';       
            var videotitle = e.target.videotitle.value;

            var videodescription = e.target.videodescription.value;
            
                Tasks.insert({
                    created_at: new Date(),
                    url: value,
                    videotitle: videotitle,
                    videodescription: videodescription
                });

            return false;    

                // Test replace.
/*
                var last = Urls.findOne({}, {
                    sort: {
                        created_at: -1,
                        limit: 1
                    }
                });

                if (last) {
                    Urls.update(last._id, {
                        $set: {
                            url: value
                        }
                    })
                } else {
                    Urls.insert({
                        created_at: new Date(),
                        url: value
                    });
                }
                */

            //}
        //}
    }
});






//

Template.urls.helpers({
    items: function () {
        return Urls.find({}, {sort: {
                created_at: -1
            }
        });
    }
});

Template.urls.events({
    "keydown #url-input": function (e, t) {
        if (e.which === 13) {
            var value = String(e.target.value || "");
            if (value && value.match(urlRe)) {
                e.target.value = '';

                Urls.insert({
                    created_at: new Date(),
                    url: value
                });

                // Test replace.
/*
                var last = Urls.findOne({}, {
                    sort: {
                        created_at: -1,
                        limit: 1
                    }
                });

                if (last) {
                    Urls.update(last._id, {
                        $set: {
                            url: value
                        }
                    })
                } else {
                    Urls.insert({
                        created_at: new Date(),
                        url: value
                    });
                }
                */

            }
        }
    }
});