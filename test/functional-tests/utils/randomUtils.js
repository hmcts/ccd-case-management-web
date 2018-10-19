class RandomUtils {

    static async generateRandomString(){
       return Math.random().toString(36).substring(7);
    }

    static async generateRandomInt(min, max){
      let trueMin = ((max - min) +1);
      return  await Math.floor(Math.random() * trueMin) + min;
    }

    static async generateRandomBoolean(){
        return await Math.random() >= 0.5;
    }




    static async generateRandomPhoneNumber(){
        let number = '0';
        for (let i=0 ; i < 10 ; i++){
             number += await this.generateRandomInt(0,9)
        }
        return number;
    }
}

module.exports = RandomUtils;

