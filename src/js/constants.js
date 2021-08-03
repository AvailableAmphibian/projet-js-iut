//API Related constants
export const API_KEY = "bbe7238ff68a42fe896f4c5cae193a14";
export const API_LINK_GAME = "https://api.rawg.io/api/games";
export const API_LINK_GENRE = "https://api.rawg.io/api/genres";
export const METACRITIC_BASE_QUERY = "50,100";

//Date related
export const DATE_TODAY = dateToday();
function dateToday(){
    const d = new Date();
    let dateToday = `${d.getFullYear()}-`;
    if (d.getMonth() + 1 < 10) {
      dateToday += `0${d.getMonth() + 1}-`;
    } else {
      dateToday += `0${d.getMonth() + 1}-`;
    }
    if (d.getDate() < 10) {
      dateToday += `0${d.getDate()}`;
    } else {
      dateToday += `${d.getDate()}`;
    }

    return dateToday;
}

//Platforms related constants used to create the tags
const PLAYSTATION_LIGHT = { link: "./src/img/platforms-icons/playstation-light.png", name: "Playstation" };
const PLAYSTATION_DARK = { link: "./src/img/platforms-icons/playstation-dark.png", name: "Playstation" };
const NINTENDO_LIGHT = { link: "./src/img/platforms-icons/nintendo-light.png", name: "Nintendo" };
const NINTENDO_DARK = { link: "./src/img/platforms-icons/nintendo-dark.png", name: "Nintendo" };
const ANDROID_LIGHT = { link: "./src/img/platforms-icons/android-light.png", name: "Android" };
const ANDROID_DARK = { link: "./src/img/platforms-icons/android-dark.png", name: "Android" };
const WINDOWS_LIGHT = { link: "./src/img/platforms-icons/windows-light.png", name: "Windows" };
const WINDOWS_DARK = { link: "./src/img/platforms-icons/windows-dark.png", name: "Windows" };
const LINUX_LIGHT = { link: "./src/img/platforms-icons/linux-light.png", name: "Linux" };
const LINUX_DARK = { link: "./src/img/platforms-icons/linux-dark.png", name: "Linux" };
const XBOX_LIGHT = { link: "./src/img/platforms-icons/xbox-light.png", name: "Xbox" };
const XBOX_DARK = { link: "./src/img/platforms-icons/xbox-dark.png", name: "Xbox" };
const MAC_LIGHT = { link: "./src/img/platforms-icons/apple-light.png", name: "macOS" };
const MAC_DARK = { link: "./src/img/platforms-icons/apple-dark.png", name: "macOS" };
const IOS_LIGHT = { link: "./src/img/platforms-icons/iphone-light.png", name: "iOS" };
const IOS_DARK = { link: "./src/img/platforms-icons/iphone-dark.png", name: "iOS" };
const UNKNOWN_LIGHT = { link: "./src/img/platforms-icons/question-mark-light.png", name: "Unknown"}
const UNKNOWN_DARK = { link: "./src/img/platforms-icons/question-mark-dark.png", name: "Unknown"}

function getPlatformsLinks(platforms) {
  let platform_links = [];
  platforms.forEach(platform => {
    if (platform.platform.slug === "pc") platform_links.push(WINDOWS_LIGHT);
    else if (platform.platform.slug === "linux") platform_links.push(LINUX_LIGHT);
    else if (platform.platform.slug === "ios") platform_links.push(IOS_LIGHT);
    else if (platform.platform.slug === "mac") platform_links.push(MAC_LIGHT);
    else if (platform.platform.slug === "android") platform_links.push(ANDROID_LIGHT);
    else if (platform.platform.slug.includes("xbox") && !platform_links.includes(XBOX_LIGHT)) platform_links.push(XBOX_LIGHT);
    else if (platform.platform.slug.includes("nintendo")) platform_links.push(NINTENDO_LIGHT);
    else if (platform.platform.slug.includes("playstation")) platform_links.push(PLAYSTATION_LIGHT);
    else if (!platform_links.includes(UNKNOWN_LIGHT)) platform_links.push(UNKNOWN_LIGHT);
  });

  return platform_links;
}

export function getPlatformsAsTag(platforms) {
  const platformLinks = getPlatformsLinks(platforms);
  let tags = "";
  platformLinks.forEach(platformLink => tags += `<img src="${platformLink.link}" alt="${platformLink.name}"/>`);
  return tags;
}