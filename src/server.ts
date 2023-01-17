import { addParamsToPath } from "./param-utils";

// https://twitter.com/intent/tweet?url=https%3A//youtu.be/T3e-vMPQuec&text=Dacre%20Montgomery%20And%20Girlfriend%20Talk%20Aussie%20Roots%20And%20Achieving%20Dreams%20O...&via=YouTube&related=YouTube,YouTubeTrends,YTCreators
const twitterParams = new URLSearchParams(
  "url=https%3A//youtu.be/rcQ_xZdzPBc&text=FARZI%20-%20Official%20Trailer%20%7C%20Raj%20%26%20DK%20%7C%20Shahid%2C%20Sethupathi%2C%20Kay%20Kay%2C%20Raash...&via=YouTube&related=YouTube,YouTubeTrends,YTCreators"
);
console.log("twitterParams");
for (let param of twitterParams) {
  console.log(param);
}
// https://api.whatsapp.com/send/?text=https%3A%2F%2Fyoutu.be%2FT3e-vMPQuec&type=custom_url&app_absent=0
const whatsappParams = new URLSearchParams(
  "?text=https%3A%2F%2Fyoutu.be%2FrcQ_xZdzPBc&type=custom_url&app_absent=0"
);
console.log("whatsappParams");
for (let param of whatsappParams) {
  console.log(param);
}
// https://www.facebook.com/dialog/share?app_id=87741124305&href=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3DT3e-vMPQuec%26feature%3Dshare&display=popup
const facebookParams = new URLSearchParams(
  "?app_id=87741124305&href=https%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3DT3e-vMPQuec%26feature%3Dshare&display=popup"
);
console.log("facebookParams");
for (let param of facebookParams) {
  console.log(param);
}

const getCustomisedUrlFromSocialUrl = (
  url: string,
  obj: Record<string, string>
) => {
  const [path, query] = url.split("?");
  const searchParams = new URLSearchParams(query);
  for (let param of searchParams) {
    const [key, value] = param;
    if (!(key in obj)) {
      throw new Error(`${key} not present`);
    }
  }
  const result = addParamsToPath(path, obj);
  return result;
};

console.log(
  getCustomisedUrlFromSocialUrl(
    "https://api.whatsapp.com/send/?text=https%3A%2F%2Fyoutu.be%2FT3e-vMPQuec&type=custom_url&app_absent=0",
    { text: "", type: "", app_absent: "0" }
  )
);
