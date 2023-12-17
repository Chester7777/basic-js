const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
class DepthCalculator {
  calculateDepth(arr) {
    // Проверяем, является ли arr массивом
    if (Array.isArray(arr)) {
      // Если arr пустой, возвращаем 1 (глубина пустого массива равна 1)
      if (arr.length === 0) {
        return 1;
      } else {
        // Иначе рекурсивно вызываем calculateDepth для каждого элемента arr
        const depths = arr.map(item => this.calculateDepth(item));
        // Возвращаем максимальную глубину из полученных значений
        return Math.max(...depths) + 1;
      }
    } else {
      // Если arr не является массивом, возвращаем 0
      return 0;
    }
  }
}

module.exports = {
  DepthCalculator
};
