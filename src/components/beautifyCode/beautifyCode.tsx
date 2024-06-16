const countryCodeToEmoji  = (countryCode:string):string=> {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
const beautifyCode = (lang:string):string =>{
  return lang.slice(0,2).toUpperCase() + " " + countryCodeToEmoji(lang.slice(-2));
}
export default beautifyCode;