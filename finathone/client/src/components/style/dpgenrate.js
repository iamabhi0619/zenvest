export function generateAvatar(gender) {
    const baseURL = 'https://avataaars.io/';

    // Options for male avatars
    const maleHairOptions = ['ShortHairShortCurly', 'ShortHairShortWaved', 'Hat'];
    const maleFacialHairOptions = ['BeardMedium', 'BeardLight'];
    const maleClothesOptions = ['BlazerShirt', 'BlazerSweater', 'CollarSweater', 'GraphicShirt', 'Hoodie'];
    const maleClotheColors = ['Heather', 'Blue03', 'Gray01', 'Gray02', 'Blue02', 'Black'];
    const maleAccessoriesOptions = ['Prescription02', 'Round', 'Blank'];
    const maleEyeOptions = ['EyeRoll', 'Happy', 'Default', 'Surprised'];
    
    // Options for female avatars
    const femaleHairOptions = [
        'LongHairMiaWallace', 
        'LongHairBob', 
        'LongHairNotTooLong', 
        'LongHairStraight', 
        'LongHairStraight2', 
        'LongHairStraightStrand'
    ];
    const femaleClothesOptions = ['BlazerSweater', 'BlazerShirt', 'ShirtScoopNeck', 'Overall'];
    const femaleClotheColors = ['Heather', 'Pink', 'Red', 'Black'];
    
    // Skin tones
    const skinTones = ['Light', 'Pale'];

    // Default parameters
    let topType = 'ShortHairShortCurly';
    let hairColor = 'Black';
    let facialHairType = 'Blank';
    let facialHairColor = 'Black';
    let clotheType = 'BlazerShirt';
    let clotheColor = 'Gray01';
    let accessoriesType = 'Blank';
    let eyeType = 'Happy';
    let mouthType = 'Smile';
    let skinColor = 'Light';

    if (gender === 'male') {
        topType = maleHairOptions[Math.floor(Math.random() * maleHairOptions.length)];
        facialHairType = maleFacialHairOptions[Math.floor(Math.random() * maleFacialHairOptions.length)];
        clotheType = maleClothesOptions[Math.floor(Math.random() * maleClothesOptions.length)];
        clotheColor = maleClotheColors[Math.floor(Math.random() * maleClotheColors.length)];
        accessoriesType = maleAccessoriesOptions[Math.floor(Math.random() * maleAccessoriesOptions.length)];
        eyeType = maleEyeOptions[Math.floor(Math.random() * maleEyeOptions.length)];
    } else if (gender === 'female') {
        topType = femaleHairOptions[Math.floor(Math.random() * femaleHairOptions.length)];
        clotheType = femaleClothesOptions[Math.floor(Math.random() * femaleClothesOptions.length)];
        clotheColor = femaleClotheColors[Math.floor(Math.random() * femaleClotheColors.length)];
        skinColor = skinTones[Math.floor(Math.random() * skinTones.length)];
        accessoriesType = 'Blank';
    }
    const avatarURL = `${baseURL}?avatarStyle=Circle&topType=${topType}&hairColor=${hairColor}&facialHairType=${facialHairType}&facialHairColor=${facialHairColor}&clotheType=${clotheType}&clotheColor=${clotheColor}&accessoriesType=${accessoriesType}&eyeType=${eyeType}&eyebrowType=DefaultNatural&mouthType=${mouthType}&skinColor=${skinColor}`;
    return avatarURL;
}
