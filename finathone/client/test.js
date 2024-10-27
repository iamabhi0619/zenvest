function generateAvatar(name, gender, uniqueId) {
    const baseURL = 'https://avataaars.io/';
    let topType = 'ShortHairShortCurly'; 
    let hairColor = 'Black'; 
    let facialHairType = 'Blank'; 
    let clotheType = 'BlazerShirt';
    let clotheColor = 'Gray01';
    let accessoriesType = 'Blank';
    if (gender === 'male') {
        topType = 'ShortHairShortCurly';
        facialHairType = 'BeardLight';
        accessoriesType = 'Glasses';
    } else if (gender === 'female') {
        topType = 'LongHairStraight';
        facialHairType = 'Blank';
        accessoriesType = 'Blank';
    }
    const seed = uniqueId || name;
    const avatarURL = `${baseURL}?avatarStyle=Circle&topType=${topType}&hairColor=${hairColor}&facialHairType=${facialHairType}&clotheType=${clotheType}&clotheColor=${clotheColor}&accessoriesType=${accessoriesType}&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light&seed=${seed}`;
    return avatarURL;
}

const avatarURL = generateAvatar('Abhishek Kumar', 'male', '12303842');
console.log(avatarURL);
