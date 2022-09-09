import html2canvas from "html2canvas";
import mixpanel from "mixpanel-browser";

const exportAsImage = async (element, fileName) => {
  const html = document.getElementsByTagName("html")[0];
  const body = document.getElementsByTagName("body")[0];
  let htmlWidth = html.clientWidth;
  let bodyWidth = body.clientWidth;
  
  const newWidth = element.scrollWidth - element.clientWidth;

  if (newWidth > element.clientWidth) {
    htmlWidth += newWidth;
    bodyWidth += newWidth;
  }

  html.style.width = htmlWidth + "px";
  body.style.width = bodyWidth + "px";

  const canvas = await html2canvas(element);
  const blob = canvas.toDataURL("image/png", 1.0);
  //downloadImage(image, imageFileName);
  mixpanel.track('Download Schedule', {'filename': fileName});
  html.style.width = null;
  body.style.width = null;
  return {blob, fileName};
};

export default exportAsImage;
