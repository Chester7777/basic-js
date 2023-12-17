const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 * 
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 * 
 * @example
 * 
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 * 
 */
function transform(arr) {
  // Проверяем, является ли arr массивом
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }
  
  // Создаем копию исходного массива
  const transformedArr = arr.slice();
  
  // Проходим по элементам массива и применяем управляющие последовательности
  for (let i = 0; i < transformedArr.length; i++) {
    switch (transformedArr[i]) {
      case '--discard-next':
        if (i !== transformedArr.length - 1) {
          transformedArr.splice(i + 1, 1);
        }
        break;
      
      case '--discard-prev':
        if (i !== 0 && transformedArr[i - 1] !== '--discard-next') {
          transformedArr.splice(i - 1, 1);
          i--;
        }
        break;
      
      case '--double-next':
        if (i !== transformedArr.length - 1) {
          transformedArr.splice(i + 1, 0, transformedArr[i + 1]);
        }
        break;
      
      case '--double-prev':
        if (i !== 0 && transformedArr[i - 1] !== '--discard-next') {
          transformedArr.splice(i - 1, 0, transformedArr[i - 1]);
          i++;
        }
        break;

      default:
        break;
    }
  }
  
  // Удаляем управляющие последовательности из преобразованного массива
  return transformedArr.filter(item => !['--discard-next', '--discard-prev', '--double-next', '--double-prev'].includes(item));
}

module.exports = {
  transform
};
