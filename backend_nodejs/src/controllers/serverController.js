const person = require('../models/person');



class ServerController {
    constructor() {

    }

    register(req, res) {
        person.create(req.body, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(201).json(data);
            }
        });
    }

  /*  update(req, res) {
        let { id, firstName, lastName, idNumber, email, password } = req.body;
        let obj = {firstName, lastName, idNumber, email, password }
        person.findByIdAndUpdate(id, { $set: obj }, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }*/


    loginUser(req, res) {
        let {  email, password}   = req.body;
        person.findOne( email,password, (error, data) => {
            if (error) {
                res.status(500).send();
            }else if(!data){
                res.status(500).send('Usuario no existente');
            }else {
                person.isCorrecPassword(password,(err, result) =>{
                    if(err){res.status(500).send();}
                    else if(result){res.status(200).send('Autenticacin Correcta');}
                    else{res.status(500).sen('email y/o password incorrectos');}
            
                });
            }
        })
    }


  

    getUsers(req, res) {
        let id = req.params.id;
        person.findById(id, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }

  
  /*  getAllUsers(req, res) {
        person.find((error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }*/

}

exports.default = ServerController;