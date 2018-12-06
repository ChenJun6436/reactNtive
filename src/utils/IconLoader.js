// Import an iconset
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
// define your suffixes by yourself..
// here we use active, big, small, very-big..
const replaceSuffixPattern = /--(active|big|small|very-big)/g;
const icons = {
    'home': [22, '#000000'],
    'file-text': [22, '#000000'],
    'shopping-bag': [22, '#000000'],
    'tv': [22, '#000000', Feather],
    'send': [22, '#000000', Feather],
    'file': [22, '#000000'],
    'comments': [22, '#000000'],
    'qrcode': [22, '#000000'],
    'camera': [22, '#000000'],
    'user': [22, '#000000'],
    'map-marker': [30, '#000000'],
    'edit': [26, '#000000', Feather],
    'search': [26, '#000000', Feather],
    'chevrons-right': [30, '#000000', Feather],
    'eye': [30, '#000000', Feather],
    'eye-off': [30, '#000000'],
    'chevron-left': [10, '#000000'],
    'map-pin': [30, '#000000', Feather],
    'location': [26, '#000000', Entypo],
    'plus': [30, '#000000', Entypo],
    'th-list': [22, '#000000'],
    'thumbs-up': [10, '#000000'],
    'camera': [26, '#ffffff'],
    'check-circle': [22, '#ffffff', Feather]
};

const defaultIconProvider = FontAwesome;

let iconsMap = {};
let iconsLoaded = new Promise((resolve, reject) => {
    new Promise.all(
        Object.keys(icons).map(iconName => {
            const Provider = icons[iconName][2] || defaultIconProvider; // Ionicons
            return Provider.getImageSource(iconName.replace(replaceSuffixPattern, ''), icons[iconName][0], icons[iconName][1]);
        })
    ).then(sources => {
        Object.keys(icons).forEach((iconName, idx) => (iconsMap[iconName] = sources[idx]));
        // Call resolve (and we are done)
        resolve(true);
    });
});

export { iconsMap, iconsLoaded };
