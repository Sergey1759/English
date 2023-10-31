const UserModel = require('../models/UserTelegram');
const generator = require('generate-password');

class User {
    constructor(id,first_name,last_name,username) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.username = username;
        this.password = generator.generate({length: 10, numbers: true});
        this.passedSlides = 0;
    }

    async createUser(){
        let user = new UserModel({
            id: this.id,
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
            password: this.password,
            passedSlides: this.passedSlides,
        })
        await user.save();
        return {username: this.username, password:this.password}
    }

    /**
     * Looking user in DB by username
     * @param  {String} username to find user in DB
     * @return {null,Object} Return Object if exist else null
     */
    static async IsExist(username){
        return UserModel.findOne({username});
    }

    static async updatePassedSlides(_id,passedSlides){
        return await UserModel.findByIdAndUpdate(_id, {passedSlides : passedSlides})
    }
    static async findById(_id){
        return await UserModel.findById(_id);
    }

    /**
     * Looking user in DB by username
     * @param  {String} username to find user in DB
     * @param  {String} password to check password
     * @return {boolean,Object} Return Users(Object) if password is correct else false
     */
    static async CheckPassword(username,password){
        const user = await this.IsExist(username);
        if(!user) return false
        if (user.password == password) return user
        return false
    }
}

module.exports = User;