const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
}

checkArguments(message, key) {
    if (!message || !key) {
        throw new Error('Incorrect arguments!');
    }
}

processText(text, key, encrypt) {
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();

        if (this.alphabet.includes(char)) {
            const charIndex = this.alphabet.indexOf(char);
            const keyChar = key[keyIndex % key.length].toUpperCase();
            const keyIndexInAlphabet = this.alphabet.indexOf(keyChar);

            let newIndex;
            if (encrypt) {
                newIndex = (charIndex + keyIndexInAlphabet) % 26;
            } else {
                newIndex = (charIndex - keyIndexInAlphabet + 26) % 26;
            }

            result += this.alphabet[newIndex];
            keyIndex++;
        } else {
            result += char;
        }
    }

    return result;
}

encrypt(message, key) {
    this.checkArguments(message, key);
    const processedMessage = this.processText(message, key, true);
    return this.isDirect ? processedMessage : processedMessage.split('').reverse().join('');
}

decrypt(encryptedMessage, key) {
    this.checkArguments(encryptedMessage, key);
    const processedMessage = this.processText(encryptedMessage, key, false);
    return this.isDirect ? processedMessage : processedMessage.split('').reverse().join('');
}
}

module.exports = {
  VigenereCipheringMachine
};
