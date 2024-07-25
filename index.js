const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

const users = [{
    name: "john",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

// query parameter
app.get('/', function(req, res){
    const johnkidneys = users[0].kidneys;
    // console.log(johnkidneys);
    const numberOfKidneys = johnkidneys.length;
    let numberOfHealthyKidneys = 0;
    
                               
    for(let i = 0; i < johnkidneys.length; i++){
        if(johnkidneys[i].healthy){
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
});

app.post("/", function (req, res) {
    console.log(req.body);
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})

app.put("/", function(req, res) {
    if(unHealthyKidneys()){
        for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;
        }
        res.json({ msg: "done" });
    }else{
        res.status(411).json({
            msg: "good"
        });
    }
})

function unHealthyKidneys(){
    let unhealthykidneys = false;
    for(let i = 0; i < users[0].kidneys.length; i++){
        if(users[0].kidneys[i].healthy === false){
            unhealthykidneys = true;
        }
    }
    return unhealthykidneys;
}

app.delete("/", function (req, res) {
    if (isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({ msg: "done" })
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}

app.listen(3000);


