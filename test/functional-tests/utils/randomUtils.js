class RandomUtils {

    static async generateRandomInt(max){
      Math.floor(Math.random() * max) + 1
    }

    static async generateRandomInt(min, max){
      let trueMin = ((max - min) +1);
      let trueMax = min;

      return Math.floor(Math.random() * trueMin) + trueMax;

    }

}

module.exports = RandomUtils;

