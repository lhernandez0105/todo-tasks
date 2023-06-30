var mongoose = require("mongoose");
var TaskModel = require('./task_schema');
var express = require("express");
var router = express.Router();

let environment = null;

if (!process.env.ON_HEROKU) {
    console.log("Cargando variables de entorno desde archivo");
    const env = require('node-env-file');
    env(__dirname + '/.env');
}

environment = {
    DBMONGOUSER: process.env.DBMONGOUSER,
    DBMONGOPASS: process.env.DBMONGOPASS,
    DBMONGOSERV: process.env.DBMONGOSERV,
    DBMONGO: process.env.DBMONGO,
};

var query = 'mongodb+srv://' + environment.DBMONGOUSER + ':' + environment.DBMONGOPASS + '@' + environment.DBMONGOSERV + '/' + environment.DBMONGO + '?retryWrites=true&w=majority';

const db = (query);

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    } else {
        console.log("Se ha conectado con la base de datos exitosamente");
    }
});

//crear tareas
router.post('/create-task', function (req, res) {
    let task_id = req.body.TaskId;
    let name = req.body.Name;
    let deadline = req.body.Deadline;

    let task = {
        TaskId: task_id,
        Name: name,
        Deadline: deadline
    }
    var newTask = new TaskModel(task);

    newTask.save(function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Error interno\n");
        }
        else {
            res.status(200).send("OK Funciona, no le muevas nada\n");
        }
    });
});

//consultar tareas
router.get('/all-tasks', function (req, res) {
    TaskModel.find(function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        }
        else {
            res.status(200).send(data);
        }
    });
});

//actualizar tarea
router.post('/update-task', function (req, res) {
    TaskModel.updateOne({ TaskId: req.body.TaskId }, {
        Name: req.body.Name,
        Deadline: req.body.Deadline
    }, function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        } else {
            res.status(200).send("OK\n");
        }
    });
});

//Eliminar una tarea

router.delete('/delete-task', function (req, res) {
    TaskModel.deleteOne({ TaskId: req.body.TaskId }, function (err, data) {
        if (err) {
            res.status(500).send("Internal error\n");
        } else {
            res.status(200).send("OK\n");
        }
    });
});

module.exports = router;