const countryCodeToEmoji = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};
const beautifyCode = (lang) =>{
  return lang.slice(0,2).toUpperCase() + " " + countryCodeToEmoji(lang.slice(-2));
}
export default beautifyCode;